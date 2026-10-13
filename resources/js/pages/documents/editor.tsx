import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import FieldError from '@/common/components/field-error';
import EditorToolbar from '@/modules/documents/components/editor-toolbar';

type User = { id: number; name: string; email: string };
type Share = User & { role: 'viewer' | 'editor' };
type DocumentData = { id: number; title: string; content: string; owner: string; owner_id: number; updated_at: string | null };

type EditorProps = {
    document: DocumentData;
    canEdit: boolean;
    canShare: boolean;
    currentRole: 'owner' | 'viewer' | 'editor';
    shares: Share[];
    users: User[];
};

export default function Editor({ document: doc, canEdit, canShare, currentRole, shares, users }: EditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState(doc.title);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [shareEmail, setShareEmail] = useState(users[0]?.email ?? '');
    const [shareRole, setShareRole] = useState<'viewer' | 'editor'>('viewer');
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };

    useEffect(() => {
        if (editorRef.current) editorRef.current.innerHTML = doc.content;
    }, [doc.id, doc.content]);

    useEffect(() => {
        const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
            if (!dirty) return;
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', warnBeforeLeaving);
        return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
    }, [dirty]);

    function apply(command: string, value?: string) {
        editorRef.current?.focus();
        window.document.execCommand(command, false, value);
        setDirty(true);
    }

    function save() {
        setSaving(true);
        setMessage('');
        router.put(`/documents/${doc.id}`, {
            title: title.trim() || 'Untitled document',
            content: editorRef.current?.innerHTML || '<p></p>',
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setDirty(false);
                setMessage('Saved');
            },
            onError: () => setMessage('Could not save. Please check the fields.'),
            onFinish: () => setSaving(false),
        });
    }

    function share(event: React.FormEvent) {
        event.preventDefault();
        router.post(`/documents/${doc.id}/share`, { email: shareEmail, role: shareRole }, { preserveScroll: true });
    }

    function removeShare(user: User) {
        router.delete(`/documents/${doc.id}/share/${user.id}`, { preserveScroll: true });
    }

    const roleLabel = currentRole === 'owner' ? 'Owner' : currentRole === 'editor' ? 'Can edit' : 'View only';

    return (
        <>
            <Head title={doc.title} />
            <div className="min-h-[calc(100vh-4rem)] bg-[#f8f9fa]">
                <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <Link href="/dashboard" onClick={(event) => { if (dirty && !window.confirm('You have unsaved changes. Leave without saving?')) event.preventDefault(); }} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
                            <ArrowLeft className="size-4" /> Back to documents
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full border border-[#dadce0] bg-white px-3 py-1.5 text-xs font-medium text-[#5f6368]">{roleLabel}</span>
                            {canEdit && (
                                <Button onClick={save} disabled={saving || !dirty}>
                                    {saving ? 'Saving…' : <><Check className="size-4" /> {message === 'Saved' ? 'Saved' : 'Save'}</>}
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
                        <main className="overflow-hidden rounded-xl border border-[#dadce0] bg-white shadow-[0_1px_3px_rgba(60,64,67,.12)]">
                            <div className="border-b border-[#dadce0] px-6 py-5 sm:px-10">
                                {canEdit ? (
                                    <Input value={title} onChange={(event) => { setTitle(event.target.value); setDirty(true); }} className="h-auto border-0 bg-transparent px-0 text-2xl font-semibold shadow-none focus-visible:ring-0" maxLength={120} />
                                ) : (
                                    <h1 className="text-2xl font-semibold">{doc.title}</h1>
                                )}
                                {errors.title && <FieldError message={errors.title} />}
                                <p className="mt-1 text-xs text-muted-foreground">Owned by {doc.owner}</p>
                            </div>

                            {canEdit && <EditorToolbar apply={apply} />}

                            <div
                                ref={editorRef}
                                contentEditable={canEdit}
                                suppressContentEditableWarning
                                role="textbox"
                                aria-multiline="true"
                                aria-label="Document content"
                                spellCheck
                                onInput={() => setDirty(true)}
                                className="document-editor min-h-[520px] px-6 py-8 outline-none sm:px-10"
                                data-placeholder="Start writing…"
                            />
                            {errors.content && <div className="border-t border-[#dadce0] px-6 py-2 sm:px-10"><FieldError message={errors.content} /></div>}
                            {!canEdit && <div className="border-t border-[#dadce0] px-6 py-3 text-center text-xs text-[#5f6368]">You have view-only access to this document.</div>}
                        </main>

                        {canShare && (
                            <aside className="h-fit rounded-xl border border-[#dadce0] bg-white p-5 shadow-sm">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Share2 className="size-5" /></div>
                                    <div><h2 className="font-semibold">Share</h2><p className="text-xs text-muted-foreground">Invite a teammate</p></div>
                                </div>
                                <form onSubmit={share} className="space-y-3">
                                    <label className="block text-xs font-medium text-[#5f6368]">Person</label>
                                    <select value={shareEmail} onChange={(event) => setShareEmail(event.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50">
                                        {users.length === 0 && <option value="">No other users</option>}
                                        {users.map((user) => <option key={user.id} value={user.email}>{user.name} · {user.email}</option>)}
                                    </select>
                                    {errors.email && <FieldError message={errors.email} />}
                                    <label className="block text-xs font-medium text-[#5f6368]">Access</label>
                                    <select value={shareRole} onChange={(event) => setShareRole(event.target.value as 'viewer' | 'editor')} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50">
                                        <option value="viewer">Can view</option>
                                        <option value="editor">Can edit</option>
                                    </select>
                                    <Button className="w-full" type="submit" disabled={!shareEmail}>Share document</Button>
                                </form>

                                <div className="mt-7 border-t border-[#dadce0] pt-5">
                                    <h3 className="text-sm font-semibold">People with access</h3>
                                    <div className="mt-3 space-y-3">
                                        {shares.length === 0 && <p className="text-xs text-muted-foreground">Only you have access so far.</p>}
                                        {shares.map((share) => (
                                            <div key={share.id} className="flex items-center justify-between gap-2 text-sm">
                                                <div className="min-w-0"><p className="truncate font-medium">{share.name}</p><p className="truncate text-xs text-muted-foreground">{share.email}</p></div>
                                                <button type="button" onClick={() => removeShare(share)} className="shrink-0 text-xs text-muted-foreground underline-offset-2 hover:text-destructive hover:underline">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                    {message && message !== 'Saved' && <p className="mt-3 text-right text-sm text-red-600">{message}</p>}
                </div>
            </div>
        </>
    );
}
