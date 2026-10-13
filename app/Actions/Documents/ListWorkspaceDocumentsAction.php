<?php

namespace App\Actions\Documents;

use App\Models\Document;
use App\Models\User;
use Illuminate\Support\Collection;

class ListWorkspaceDocumentsAction
{
    /** @return array{owned: Collection, shared: Collection, users: Collection} */
    public function execute(User $user): array
    {
        return [
            'owned' => Document::query()
                ->where('owner_id', $user->id)
                ->latest('updated_at')
                ->get(['id', 'owner_id', 'title', 'updated_at']),
            'shared' => $user->sharedDocuments()
                ->with('owner:id,name,email')
                ->latest('documents.updated_at')
                ->get(['documents.id', 'documents.owner_id', 'documents.title', 'documents.updated_at']),
            'users' => User::query()
                ->where('id', '!=', $user->id)
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
        ];
    }
}
