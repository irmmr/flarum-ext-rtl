<?php

namespace Irmmr\FlarumRtlSupport\Services;

use Flarum\Settings\SettingsRepositoryInterface;
use Irmmr\FlarumRtlSupport\Enums\AssetRuleType;
use Irmmr\FlarumRtlSupport\ValueObjects\AssetRule;

class AssetMappingService
{
    /**
     * Memoized results.
     *
     * @var array<string, string>
     */
    protected static array $memo = [];

    /**
     * Memo key order.
     *
     * @var array<int, string>
     */
    protected static array $memoOrder = [];

    /**
     * Maximum memo size.
     */
    protected static int $memoLimit = 128;

    /**
     * Defined rules.
     *
     * @var array<\Irmmr\FlarumRtlSupport\ValueObjects\AssetRule>|null
     */
    protected static ?array $def;

    /**
     * class constructor.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(
        protected SettingsRepositoryInterface $settings,
    ) {}

    /**
     * Parse asset rules.
     *
     * @return array<\Irmmr\FlarumRtlSupport\ValueObjects\AssetRule>
     */
    public function parseRules(): array
    {
        $raw = $this->settings->get('irmmr-rtl.asset_rules', '');

        /** @var array */
        $rules = match (true) {
            is_string($raw) && json_validate($raw) => (array) json_decode($raw, true),
            is_array($raw) => $raw,
            default => [] 
        };

        $packed = [];

        /** @var array */
        foreach ($rules as $rule) {
            if (!is_array($rule)) {
                continue;
            }

            /** @var string|null */
            $pattern = $rule['pattern'] ?? null;

            /** @var string|null */
            $replace = $rule['replace'] ?? null;

            /** @var AssetRuleType|null */
            $type = AssetRuleType::tryFrom($rule['type'] ?? 'css');

            if ($pattern && $replace && $type) {
                $packed[] = AssetRule::from($pattern, $replace, $type);
            }
        }

        return $packed;
    }

    /**
     * Get rules.
     *
     * @return array<\Irmmr\FlarumRtlSupport\ValueObjects\AssetRule>
     */
    public function getRules(): array
    {
        return self::$def ??= $this->parseRules();
    }

    /**
     * Handle asset rules on given file
     * using simple cache.
     *
     * @param  string $file
     * @return string
     */
    public function handleRuleWithCache(string $file): string
    {
        if (isset(self::$memo[$file])) {
            return self::$memo[$file];
        }

        $result = $this->handleRule($file);

        // If cache is full, remove oldest item
        if (count(self::$memoOrder) >= self::$memoLimit) {
            $oldest = array_shift(self::$memoOrder);

            if ($oldest !== null) {
                unset(self::$memo[$oldest]);
            }
        }

        self::$memo[$file] = $result;
        self::$memoOrder[] = $file;

        return $result;
    }

    /**
     * Clear parsed rules and memo cache.
     *
     * @return void
     */
    public function clearMemo(): void
    {
        self::$memo = [];
        self::$memoOrder = [];
        self::$def = null;
    }

    /**
     * Handle asset rules on given file.
     *
     * @param  string $file
     * @return string
     */
    public function handleRule(string $file): string
    {
        $rules = $this->getRules();

        if ($rules === []) {
            return $file;
        }

        $context = $this->buildContext($file);

        foreach ($rules as $rule) {
            $resolved = $this->applyRule($rule, $context);

            if ($resolved !== null) {
                return $resolved;
            }
        }

        return $file;
    }

    /**
     * Try to apply a single rule.
     *
     * Returns null if the rule does not match.
     *
     * @param  AssetRule $rule
     * @param  array{
     *   file: string,
     *   origin: string|null,
     *   path: string,
     *   query: string,
     *   fragment: string,
     *   fullWithoutQuery: string,
     *   filename: string,
     *   dirname: string,
     *   isCss: bool,
     *   isJs: bool
     * } $context
     * @return string|null
     */
    protected function applyRule(AssetRule $rule, array $context): ?string
    {
        // Type gate: auto bypasses extension filtering.
        if ($rule->type === AssetRuleType::Css && !$context['isCss']) {
            return null;
        }

        if ($rule->type === AssetRuleType::Js && !$context['isJs']) {
            return null;
        }

        $rulePattern = $this->stripUrlSuffix($rule->pattern);
        $ruleReplace = $this->stripUrlSuffix($rule->replace);

        $isFullPattern = str_contains($rulePattern, '/');
        $target = $isFullPattern ? $context['fullWithoutQuery'] : $context['filename'];

        $regex = '#^' . str_replace('\*', '(.*)', preg_quote($rulePattern, '#')) . '$#i';

        if (!preg_match($regex, $target, $matches)) {
            return null;
        }

        array_shift($matches);

        $resolvedReplace = $ruleReplace;

        foreach ($matches as $match) {
            $resolvedReplace = preg_replace('/\*/', $match, $resolvedReplace, 1);
        }

        // Absolute URL replacement takes over completely.
        if (preg_match('#^(https?://|//)#i', $resolvedReplace)) {
            return $resolvedReplace . $context['query'] . $context['fragment'];
        }

        // Full-path pattern replacement returns as-is.
        if ($isFullPattern) {
            return $resolvedReplace . $context['query'] . $context['fragment'];
        }

        // Filename-only replacement keeps original dirname/origin.
        $rebuiltPath = ($context['dirname'] !== '' && $context['dirname'] !== '.')
            ? $context['dirname'] . '/' . ltrim($resolvedReplace, '/')
            : '/' . ltrim($resolvedReplace, '/');

        $final = $context['origin'] !== null
            ? $context['origin'] . $rebuiltPath
            : $rebuiltPath;

        return $final . $context['query'] . $context['fragment'];
    }

    /**
     * Build normalized file context once per request.
     *
     * @param  string $file
     * @return array{
     *   file: string,
     *   origin: string|null,
     *   path: string,
     *   query: string,
     *   fragment: string,
     *   fullWithoutQuery: string,
     *   filename: string,
     *   dirname: string,
     *   isCss: bool,
     *   isJs: bool
     * }
     */
    protected function buildContext(string $file): array
    {
        $parts = parse_url($file);

        $scheme   = $parts['scheme'] ?? null;
        $host     = $parts['host'] ?? null;
        $path     = $parts['path'] ?? '';
        $port     = isset($parts['port']) ? ':' . $parts['port'] : '';
        $query    = isset($parts['query']) ? '?' . $parts['query'] : '';
        $fragment = isset($parts['fragment']) ? '#' . $parts['fragment'] : '';

        $origin = null;
        if ($scheme !== null && $host !== null) {
            $origin = $scheme . '://' . $host . $port;
        }

        $fullWithoutQuery = $origin !== null ? $origin . $path : $path;
        $filename = basename($path);
        $dirname = rtrim(str_replace('\\', '/', dirname($path)), '/');

        $lowerPath = strtolower($path);
        $isCss = str_ends_with($lowerPath, '.css');
        $isJs  = str_ends_with($lowerPath, '.js');

        return [
            'file' => $file,
            'origin' => $origin,
            'path' => $path,
            'query' => $query,
            'fragment' => $fragment,
            'fullWithoutQuery' => $fullWithoutQuery,
            'filename' => $filename,
            'dirname' => $dirname,
            'isCss' => $isCss,
            'isJs' => $isJs,
        ];
    }

    /**
     * Strip url suffix.
     *
     * @param  string $value
     * @return string
     */
    private function stripUrlSuffix(string $value): string
    {
        $value = explode('?', $value, 2)[0];
        $value = explode('#', $value, 2)[0];

        return $value;
    }
}