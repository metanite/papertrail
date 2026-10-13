import { Link } from '@inertiajs/react';
import { FileText, Share2 } from 'lucide-react';

export type DocumentSummary = {
    id: number;
    title: string;
    updated_at: string | null;
    owner?: string;
    role?: 'viewer' | 'editor';
};

function formatDate(value: string | null) {
    if (!value) return 'Just now';
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function DocumentCard({ document, shared = false }: { document: DocumentSummary; shared?: boolean }) {
    return <Link href={`/documents/${document.id}`} className="group flex items-center justify-between rounded-xl border border-[#dadce0] bg-white p-4 transition hover:border-[#1a73e8] hover:shadow-[0_2px_8px_rgba(60,64,67,.15)]"><div className="flex min-w-0 items-center gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe] text-[#1a73e8]">{shared ? <Share2 className="size-5" /> : <FileText className="size-5" />}</div><div className="min-w-0"><p className="truncate font-medium text-[#202124] group-hover:text-[#1a73e8]">{document.title}</p><p className="mt-1 truncate text-xs text-[#5f6368]">{shared ? `Shared by ${document.owner}` : 'Owned by you'} · {formatDate(document.updated_at)}</p></div></div>{shared && <span className="ml-3 shrink-0 rounded-full bg-[#f1f3f4] px-2.5 py-1 text-xs font-medium capitalize text-[#5f6368]">{document.role}</span>}</Link>;
}
