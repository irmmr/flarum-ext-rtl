<?php
/*
 * This file is part of Flarum RTL support extension.
 *
 * (c)  Irmmr <irmmr.ir@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Irmmr\FlarumRtlSupport\Providers;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Frontend\Compiler\LessCompiler;
use Irmmr\FlarumRtlSupport\Frontend\Compiler\RtlLessCompiler;

/**
 * Flarum asks the container for every LESS compiler it builds
 * (Assets::makeLessCompiler), so binding the subclass here is all it takes
 * for every stylesheet to get an RTL copy.
 */
class CompilerServiceProvider extends AbstractServiceProvider
{
    public function register(): void
    {
        $this->container->bind(LessCompiler::class, RtlLessCompiler::class);
    }
}
