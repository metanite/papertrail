<?php

namespace App\Actions\Documents;

use App\Models\Document;
use App\Models\User;

class RemoveDocumentShareAction
{
    public function execute(Document $document, User $recipient): void
    {
        $document->sharedUsers()->detach($recipient->id);
    }
}
