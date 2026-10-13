<?php

namespace Tests\Unit\Actions;

use App\Actions\Documents\CreateDocumentAction;
use App\Actions\Documents\ImportTextDocumentAction;
use App\Actions\Documents\ListWorkspaceDocumentsAction;
use App\Actions\Documents\RemoveDocumentShareAction;
use App\Actions\Documents\SanitizeDocumentContentAction;
use App\Actions\Documents\ShareDocumentAction;
use App\Actions\Documents\UpdateDocumentAction;
use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class DocumentsActionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_sanitize_document_content_action_keeps_supported_markup_only(): void
    {
        $content = app(SanitizeDocumentContentAction::class)->execute('<p onclick="bad()">Hello</p><script>bad()</script>');

        $this->assertSame('<p>Hello</p>bad()', $content);
    }

    public function test_create_document_action_creates_owned_document(): void
    {
        $owner = User::factory()->create();

        $document = app(CreateDocumentAction::class)->execute($owner, ' Notes ', '<p>Text</p>');

        $this->assertSame($owner->id, $document->owner_id);
        $this->assertSame('Notes', $document->title);
    }

    public function test_update_document_action_updates_and_sanitizes_document(): void
    {
        $document = Document::factory()->create();

        $updated = app(UpdateDocumentAction::class)->execute($document, ' Revised ', '<p>Updated</p>');

        $this->assertSame('Revised', $updated->title);
        $this->assertSame('<p>Updated</p>', $updated->content);
    }

    public function test_import_text_document_action_creates_paragraphs(): void
    {
        $owner = User::factory()->create();
        $file = UploadedFile::fake()->createWithContent('ideas.txt', "One\nTwo");

        $document = app(ImportTextDocumentAction::class)->execute($owner, $file);

        $this->assertSame('ideas', $document->title);
        $this->assertSame('<p>One</p><p>Two</p>', $document->content);
    }

    public function test_share_document_action_upserts_a_recipient_role(): void
    {
        $owner = User::factory()->create();
        $recipient = User::factory()->create();
        $document = Document::factory()->create(['owner_id' => $owner->id]);

        $share = app(ShareDocumentAction::class)->execute($document, $owner, $recipient, 'editor');

        $this->assertSame('editor', $share->role);
        $this->assertDatabaseHas('document_shares', ['document_id' => $document->id, 'user_id' => $recipient->id, 'role' => 'editor']);
    }

    public function test_remove_document_share_action_revokes_access(): void
    {
        $document = Document::factory()->create();
        $recipient = User::factory()->create();
        $document->sharedUsers()->attach($recipient, ['role' => 'viewer']);

        app(RemoveDocumentShareAction::class)->execute($document, $recipient);

        $this->assertDatabaseMissing('document_shares', ['document_id' => $document->id, 'user_id' => $recipient->id]);
    }

    public function test_list_workspace_documents_action_returns_owned_shared_and_users(): void
    {
        $owner = User::factory()->create();
        $recipient = User::factory()->create();
        $owned = Document::factory()->create(['owner_id' => $owner->id]);
        $shared = Document::factory()->create();
        $shared->sharedUsers()->attach($owner, ['role' => 'viewer']);

        $workspace = app(ListWorkspaceDocumentsAction::class)->execute($owner);

        $this->assertTrue($workspace['owned']->contains($owned));
        $this->assertTrue($workspace['shared']->contains($shared));
        $this->assertFalse($workspace['users']->contains($owner));
        $this->assertTrue($workspace['users']->contains($recipient));
    }
}
