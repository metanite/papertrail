<?php

namespace App\Http\Controllers;

use App\Actions\Documents\CreateDocumentAction;
use App\Actions\Documents\ImportTextDocumentAction;
use App\Actions\Documents\ListWorkspaceDocumentsAction;
use App\Actions\Documents\RemoveDocumentShareAction;
use App\Actions\Documents\ShareDocumentAction;
use App\Actions\Documents\UpdateDocumentAction;
use App\Http\Requests\CreateDocumentRequest;
use App\Http\Requests\ImportDocumentRequest;
use App\Http\Requests\ShareDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Http\Resources\DocumentShareResource;
use App\Http\Resources\DocumentSummaryResource;
use App\Http\Resources\UserResource;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function __construct(
        private readonly CreateDocumentAction $createDocument,
        private readonly ImportTextDocumentAction $importTextDocument,
        private readonly UpdateDocumentAction $updateDocument,
        private readonly ShareDocumentAction $shareDocument,
        private readonly RemoveDocumentShareAction $removeDocumentShare,
        private readonly ListWorkspaceDocumentsAction $listWorkspaceDocuments,
    ) {}

    public function dashboard(Request $request): Response
    {
        $workspace = $this->listWorkspaceDocuments->execute($request->user());

        return Inertia::render('dashboard', [
            'ownedDocuments' => DocumentSummaryResource::collection($workspace['owned'])->resolve($request),
            'sharedDocuments' => DocumentSummaryResource::collection($workspace['shared'])->resolve($request),
            'demoUsers' => UserResource::collection($workspace['users'])->resolve($request),
        ]);
    }

    public function store(CreateDocumentRequest $request): RedirectResponse
    {
        $document = $this->createDocument->execute(
            $request->user(),
            $request->string('title')->toString(),
            $request->string('content')->toString(),
        );

        return to_route('documents.show', $document)->with('success', 'Document created.');
    }

    public function upload(ImportDocumentRequest $request): RedirectResponse
    {
        $document = $this->importTextDocument->execute($request->user(), $request->file('file'));

        return to_route('documents.show', $document)->with('success', 'Text file imported.');
    }

    public function show(Request $request, Document $document): Response
    {
        Gate::authorize('view', $document);
        $document->load(['owner:id,name,email', 'sharedUsers:id,name,email']);

        $share = $document->sharedUsers->firstWhere('id', $request->user()->id);

        return Inertia::render('documents/editor', [
            'document' => (new DocumentResource($document))->resolve($request),
            'canEdit' => $request->user()->can('update', $document),
            'canShare' => $request->user()->can('share', $document),
            'shares' => DocumentShareResource::collection($document->sharedUsers)->resolve($request),
            'currentRole' => $document->owner_id === $request->user()->id ? 'owner' : $share?->pivot?->role,
            'users' => $request->user()->can('share', $document)
                ? UserResource::collection(User::query()->where('id', '!=', $request->user()->id)->orderBy('name')->get())->resolve($request)
                : [],
        ]);
    }

    public function update(UpdateDocumentRequest $request, Document $document): RedirectResponse
    {
        $this->updateDocument->execute(
            $document,
            $request->string('title')->toString(),
            $request->string('content')->toString(),
        );

        return back()->with('success', 'Saved');
    }

    public function share(ShareDocumentRequest $request, Document $document): RedirectResponse
    {
        Gate::authorize('share', $document);
        $recipient = User::where('email', $request->string('email')->toString())->firstOrFail();

        $this->shareDocument->execute(
            $document,
            $request->user(),
            $recipient,
            $request->string('role')->toString(),
        );

        return back()->with('success', "Shared with {$recipient->name}.");
    }

    public function unshare(Request $request, Document $document, User $user): RedirectResponse
    {
        Gate::authorize('share', $document);
        $this->removeDocumentShare->execute($document, $user);

        return back()->with('success', "Removed {$user->name}'s access.");
    }
}
