<?php

namespace App\Actions\Documents;

use App\Models\Document;
use App\Models\DocumentShare;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ShareDocumentAction
{
    public function execute(Document $document, User $actor, User $recipient, string $role): DocumentShare
    {
        if ($document->owner_id !== $actor->id) {
            throw new AuthorizationException('Only the owner can share this document.');
        }

        if ($document->owner_id === $recipient->id) {
            throw ValidationException::withMessages(['email' => 'The owner already has access.']);
        }

        return DB::transaction(fn () => DocumentShare::updateOrCreate(
            ['document_id' => $document->id, 'user_id' => $recipient->id],
            ['role' => $role],
        ));
    }
}
