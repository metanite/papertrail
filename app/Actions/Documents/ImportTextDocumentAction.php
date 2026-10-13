<?php

namespace App\Actions\Documents;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class ImportTextDocumentAction
{
    public function __construct(
        private readonly CreateDocumentAction $createDocument,
    ) {}

    public function execute(User $owner, UploadedFile $file): Document
    {
        $text = trim($file->get());
        $content = collect(preg_split('/\R/u', $text) ?: [''])
            ->map(fn (string $line) => '<p>'.e($line ?: ' ').'</p>')
            ->implode('');

        return $this->createDocument->execute(
            $owner,
            pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) ?: 'Imported document',
            $content ?: '<p></p>',
        );
    }
}
