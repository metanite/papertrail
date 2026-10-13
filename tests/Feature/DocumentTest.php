<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class DocumentTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_returns_owned_and_shared_documents(): void
    {
        $owner = User::factory()->create(['email_verified_at' => now()]);
        $document = Document::create(['owner_id' => $owner->id, 'title' => 'Workspace', 'content' => '<p>Text</p>']);

        $this->actingAs($owner)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('dashboard')
                ->has('ownedDocuments', 1)
                ->where('ownedDocuments.0.title', 'Workspace'));
    }

    public function test_owner_can_create_and_update_a_document(): void
    {
        $owner = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($owner)
            ->post(route('documents.store'), [
                'title' => 'Project notes',
                'content' => '<p><strong>Important</strong></p>',
            ])
            ->assertRedirect();

        $document = Document::firstOrFail();

        $this->actingAs($owner)
            ->put(route('documents.update', $document), [
                'title' => 'Updated notes',
                'content' => '<h1>Heading</h1><ul><li>One</li></ul>',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('documents', [
            'id' => $document->id,
            'title' => 'Updated notes',
            'content' => '<h1>Heading</h1><ul><li>One</li></ul>',
        ]);
    }

    public function test_txt_upload_creates_a_new_document(): void
    {
        $owner = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($owner)
            ->post(route('documents.upload'), [
                'file' => UploadedFile::fake()->createWithContent('meeting.txt', "First line\nSecond line"),
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('documents', [
            'owner_id' => $owner->id,
            'title' => 'meeting',
            'content' => '<p>First line</p><p>Second line</p>',
        ]);
    }

    public function test_sharing_controls_view_and_edit_access(): void
    {
        $owner = User::factory()->create(['email_verified_at' => now()]);
        $editor = User::factory()->create(['email_verified_at' => now()]);
        $viewer = User::factory()->create(['email_verified_at' => now()]);
        $outsider = User::factory()->create(['email_verified_at' => now()]);
        $document = Document::create(['owner_id' => $owner->id, 'title' => 'Shared', 'content' => '<p>Text</p>']);

        $this->actingAs($owner)->post(route('documents.share', $document), ['email' => $editor->email, 'role' => 'editor']);
        $this->actingAs($owner)->post(route('documents.share', $document), ['email' => $viewer->email, 'role' => 'viewer']);

        $this->actingAs($editor)
            ->put(route('documents.update', $document), ['title' => 'Edited', 'content' => '<p>Changed</p>'])
            ->assertRedirect();

        $this->actingAs($viewer)
            ->get(route('documents.show', $document))
            ->assertOk();

        $this->actingAs($viewer)
            ->put(route('documents.update', $document), ['title' => 'Nope', 'content' => '<p>Nope</p>'])
            ->assertForbidden();

        $this->actingAs($outsider)
            ->get(route('documents.show', $document))
            ->assertForbidden();
    }
}
