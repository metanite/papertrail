<?php

namespace App\Models;

use Database\Factories\DocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Document extends Model
{
    use HasFactory;

    protected $fillable = ['owner_id', 'title', 'content', 'content_format'];

    protected static function newFactory(): DocumentFactory
    {
        return DocumentFactory::new();
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function sharedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'document_shares')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function isEditor(User $user): bool
    {
        return $this->owner_id === $user->id
            || $this->sharedUsers()->whereKey($user->id)->wherePivot('role', 'editor')->exists();
    }
}
