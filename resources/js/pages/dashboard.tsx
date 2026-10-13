import { Head, router } from '@inertiajs/react';
import { FilePlus2, Folder, Home, Search, Share2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

import EmptyState from '@/modules/documents/components/empty-state';
import DocumentCard, { type DocumentSummary } from '@/modules/documents/components/document-card';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';

type DemoUser = { id: number; name: string; email: string };
type Props = { ownedDocuments: DocumentSummary[]; sharedDocuments: DocumentSummary[]; demoUsers: DemoUser[] };

export default function Dashboard({ ownedDocuments, sharedDocuments, demoUsers }: Props) {
    const [title, setTitle] = useState('Untitled document');
    const [query, setQuery] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null);
    const filter = (documents: DocumentSummary[]) => documents.filter((document) => document.title.toLowerCase().includes(query.toLowerCase()));

    function createDocument(event: React.FormEvent) {
        event.preventDefault();
        router.post('/documents', { title, content: '<p></p>' });
    }

    function uploadDocument(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append('file', file);
        router.post('/documents/import', data, { forceFormData: true, onFinish: () => setUploading(false) });
        event.target.value = '';
    }

    return <>
        <Head title="Documents" />
        <div className="flex min-h-[calc(100vh-4rem)]">
            <aside className="hidden w-60 shrink-0 border-r border-[#dadce0] bg-white px-3 py-5 lg:block">
                <Button onClick={() => document.getElementById('new-document-title')?.focus()} className="mb-6 w-full justify-start rounded-full px-5 shadow-[0_1px_3px_rgba(60,64,67,.2)]"><FilePlus2 className="size-5" /> New document</Button>
                <nav className="space-y-1 text-sm"><a href="#recent" className="flex items-center gap-3 rounded-r-full bg-[#e8f0fe] px-4 py-2.5 font-medium text-[#174ea6]"><Home className="size-4" /> Home</a><a href="#owned" className="flex items-center gap-3 rounded-r-full px-4 py-2.5 text-[#5f6368] hover:bg-[#f1f3f4]"><Folder className="size-4" /> My documents</a><a href="#shared" className="flex items-center gap-3 rounded-r-full px-4 py-2.5 text-[#5f6368] hover:bg-[#f1f3f4]"><Share2 className="size-4" /> Shared with me</a></nav>
                <div className="mt-10 border-t border-[#f1f3f4] pt-5 text-xs leading-5 text-[#5f6368]"><p className="font-semibold text-[#3c4043]">Storage</p><p className="mt-1">Documents are saved in your Papertrail workspace.</p></div>
            </aside>

            <main className="min-w-0 flex-1 bg-[#f8f9fa] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#5f6368]">Workspace</p><h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-[#202124]">Good morning</h1></div><div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#5f6368]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents" className="pl-9" /></div></div>
                    <section id="recent" className="mt-9"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold text-[#202124]">Start a new document</h2><p className="mt-1 text-sm text-[#5f6368]">Create from scratch or bring in a plain text file.</p></div><Button variant="outline" size="sm" onClick={() => fileInput.current?.click()} disabled={uploading}><Upload className="size-4" /> {uploading ? 'Importing…' : 'Import .txt'}</Button><input ref={fileInput} className="hidden" type="file" accept=".txt,text/plain" onChange={uploadDocument} /></div><form onSubmit={createDocument} className="flex max-w-xl gap-2 rounded-xl border border-[#dadce0] bg-white p-3 shadow-sm"><Input id="new-document-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Name your document" maxLength={120} /><Button type="submit">Create</Button></form></section>
                    <section id="owned" className="mt-12"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold text-[#202124]">My documents</h2><p className="mt-1 text-sm text-[#5f6368]">Documents you own and manage.</p></div><span className="text-sm text-[#5f6368]">{filter(ownedDocuments).length} documents</span></div>{filter(ownedDocuments).length ? <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filter(ownedDocuments).map((document) => <DocumentCard key={document.id} document={document} />)}</div> : <EmptyState label={query ? 'No matching documents' : 'No documents yet'} />}</section>
                    <section id="shared" className="mt-12"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold text-[#202124]">Shared with me</h2><p className="mt-1 text-sm text-[#5f6368]">Documents your teammates have shared with you.</p></div><span className="text-sm text-[#5f6368]">{filter(sharedDocuments).length} documents</span></div>{filter(sharedDocuments).length ? <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filter(sharedDocuments).map((document) => <DocumentCard key={document.id} document={document} shared />)}</div> : <EmptyState label={query ? 'No matching documents' : 'Nothing shared yet'} shared />}</section>
                    <p className="mt-12 text-xs text-[#80868b]">Demo workspace includes {demoUsers.length} other seeded users. All imported files are plain <strong>.txt</strong> documents up to 1 MB.</p>
                </div>
            </main>
        </div>
    </>;
}
