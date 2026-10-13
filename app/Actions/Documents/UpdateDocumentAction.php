<?php

namespace App\Actions\Documents;

use App\Models\Document;

class UpdateDocumentAction
{
    public function __construct(private readonly SanitizeDocumentContentAction $sanitize) {}

    public function execute(Document $document, string $title, string $content): Document
    {
        $document->update([
            'title' => trim($title),
            'content' => $this->sanitize->execute($content),
        ]);

        return $document->refresh();
    }
}
