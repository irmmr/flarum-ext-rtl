<?php

namespace Irmmr\FlarumRtlSupport\Frontend\Content;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class ForumContent extends BaseContent
{
    /**
     * Magic method invoke for apply changes
     * plus making everything rtl.
     *
     * @param  Document                 $document
     * @param  ServerRequestInterface   $request
     * @return void
     */
    public function __invoke(Document $document, ServerRequestInterface $request): void
    {
        // check if rtl status is active for admin document
        if (!$this->mustBeRtl($document, 'admin')) {
            return;
        }

        // direction from ltr => rtl
        $document->direction = 'rtl';

        // find and convert all css files to their rtl version
        // file.css => file.rtl.css
        $document->css      = $this->makeCssRtl($document->css);
        $document->head     = $this->makeHeadRtl($document->head);
        $document->payload  = $this->makePayloadRtl($document->payload);

        // additional styles if defined
        $this->addExtraStyles($document);
    }
}