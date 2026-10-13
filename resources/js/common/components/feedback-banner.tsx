import { CheckCircle2, CircleAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/common/utils';
import { usePage } from '@inertiajs/react';

type FeedbackProps = {
    flash?: { success?: string | null; error?: string | null };
    errors?: Record<string, string>;
};

export default function FeedbackBanner() {
    const { flash, errors } = usePage().props as unknown as FeedbackProps;
    const [dismissed, setDismissed] = useState(false);
    const message = flash?.success || flash?.error || Object.values(errors ?? {})[0];
    const isError = Boolean(flash?.error || Object.keys(errors ?? {}).length);

    useEffect(() => setDismissed(false), [message]);

    if (!message || dismissed) return null;

    return <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8" role="alert"><div className={cn('flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-sm', isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700')}><span className="mt-0.5 shrink-0">{isError ? <CircleAlert className="size-4" /> : <CheckCircle2 className="size-4" />}</span><span className="flex-1">{message}</span><button type="button" aria-label="Dismiss message" onClick={() => setDismissed(true)} className="shrink-0 opacity-70 hover:opacity-100"><X className="size-4" /></button></div></div>;
}
