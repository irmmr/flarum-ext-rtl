<?php

namespace Irmmr\FlarumRtlSupport\Traits;

trait SettingsTrait
{
    /**
     * Get setting.
     *
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    public function getSettingOption(string $key, mixed $default = null): mixed
    {
        $data = $this->settings->get($key) ?? $default;

        return is_string($data)
            ? trim($data)
            : $data;
    }
}