<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;

class DocumentPolicy
{
    public function view(User $user, Document $document): bool
    {
        return $document->owner_id === $user->id
            || $document->sharedUsers()->whereKey($user->id)->exists();
    }

    public function update(User $user, Document $document): bool
    {
        return $document->isEditor($user);
    }

    public function share(User $user, Document $document): bool
    {
        return $document->owner_id === $user->id;
    }
}
