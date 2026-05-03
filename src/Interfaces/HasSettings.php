<?php

namespace Irmmr\FlarumRtlSupport\Interfaces;

interface HasSettings
{
    /**
     * Get setting option value.
     *
     * @param  string $key
     * @param  mixed $default
     * @return mixed
     */
    public function getSettingOption(string $key, mixed $default = null): mixed;
}