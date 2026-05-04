<?php

namespace Irmmr\FlarumRtlSupport\ValueObjects;

use Irmmr\FlarumRtlSupport\Enums\AssetRuleType;

readonly class AssetRule
{
    /**
     * class constructor.
     *
     * @param string $pattern
     * @param string $replace
     * @param AssetRuleType $type
     */
    public function __construct(
        public string $pattern,
        public string $replace,
        public AssetRuleType $type
    ) {}

    /**
     * Create asset-rule from given data.
     *
     * @param  string        $pattern
     * @param  string        $repalce
     * @param  AssetRuleType $type
     * @return self
     */
    public static function from(string $pattern, string $repalce, AssetRuleType $type): self
    {
        return new self($pattern, $repalce, $type);
    }
}