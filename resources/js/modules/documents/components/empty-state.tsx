import { FileText, FolderOpen } from 'lucide-react';

export default function EmptyState({ label, shared = false }: { label: string; shared?: boolean }) {
    return <div className="rounded-xl border border-dashed border-[#dadce0] bg-white p-10 text-center">{shared ? <FolderOpen className="mx-auto size-7 text-[#9aa0a6]" /> : <FileText className="mx-auto size-7 text-[#9aa0a6]" />}<p className="mt-3 text-sm font-medium text-[#3c4043]">{label}</p><p className="mt-1 text-sm text-[#5f6368]">{shared ? 'Shared documents will appear here.' : 'Create your first document to get started.'}</p></div>;
}
