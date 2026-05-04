<?php

namespace Irmmr\FlarumRtlSupport\Services;

use Flarum\Settings\SettingsRepositoryInterface;

use function is_array;
use function is_string;
use function json_validate;
use function json_decode;
use function array_filter;
use function array_map;

class PayloadsService
{
    /**
     * Defined payloads.
     *
     * @var array|null
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
     * Parse payloads from raw setting.
     *
     * @return array<string>
     */
    public function parsePayloads(): array
    {
        $raw = $this->settings->get('irmmr-rtl.payloads', '');

        /** @var array */
        $payloads = match (true) {
            is_string($raw) && json_validate($raw) => (array) json_decode($raw, true),
            is_array($raw) => $raw,
            default => [] 
        };

        return array_map('trim', array_filter(
            $payloads,
            fn ($payload) => is_string($payload) && !empty($payload)
        ));
    }

    /**
     * Get payloads as string.
     *
     * @return array<string>
     */
    public function getPayloads(): array
    {
        return self::$def ??= $this->parsePayloads();
    }
}