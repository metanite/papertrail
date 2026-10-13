<?php

namespace App\Actions\Documents;

use App\Models\Document;
use App\Models\User;

class CreateDocumentAction
{
    public function __construct(private readonly SanitizeDocumentContentAction $sanitize) {}

    public function execute(User $owner, string $title, string $content): Document
    {
        return Document::create([
            'owner_id' => $owner->id,
            'title' => trim($title),
            'content' => $this->sanitize->execute($content),
        ]);
    }
}
