import { Head, Link, usePage } from '@inertiajs/react';
import { Check, FileText, LockKeyhole, Share2, Sparkles } from 'lucide-react';

import { dashboard, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props as unknown as { auth?: { user?: { id: number } } };
    const startHref = auth?.user ? dashboard() : register();

    return (
        <>
            <Head title="Write together, simply" />
            <main>
                <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-28 lg:pt-20">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2e3fc] bg-[#e8f0fe] px-3 py-1.5 text-xs font-semibold text-[#174ea6]"><Sparkles className="size-3.5" /> A calmer document workspace</div>
                        <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#202124] sm:text-6xl">Ideas are better when they have room to breathe.</h1>
                        <p className="mt-6 max-w-lg text-lg leading-8 text-[#5f6368]">Papertrail is a focused place to write, format, and share documents with your team—without the noise.</p>
                        <div className="mt-8 flex flex-wrap items-center gap-3"><Link href={startHref} className="rounded-lg bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1765cc]">Start writing</Link><a href="#how-it-works" className="rounded-lg px-5 py-3 text-sm font-semibold text-[#1a73e8] hover:bg-[#e8f0fe]">See how it works</a></div>
                        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5f6368]"><span className="inline-flex items-center gap-2"><Check className="size-4 text-[#1a73e8]" /> Rich-text editing</span><span className="inline-flex items-center gap-2"><Check className="size-4 text-[#1a73e8]" /> Simple sharing</span><span className="inline-flex items-center gap-2"><Check className="size-4 text-[#1a73e8]" /> Explicit save control</span></div>
                    </div>

                    <div className="relative rounded-2xl border border-[#dadce0] bg-white p-3 shadow-[0_16px_45px_rgba(60,64,67,.16)] sm:p-5">
                        <div className="flex items-center gap-3 border-b border-[#f1f3f4] pb-4"><div className="flex size-9 items-center justify-center rounded-lg bg-[#1a73e8] text-white"><FileText className="size-4" /></div><div className="h-3 w-44 rounded bg-[#e8eaed]" /><div className="ml-auto flex gap-1"><span className="size-7 rounded-full bg-[#d3e3fd]" /><span className="size-7 rounded-full bg-[#fce8e6]" /></div></div>
                        <div className="flex items-center gap-1 border-b border-[#f1f3f4] py-3"><span className="size-7 rounded bg-[#f1f3f4]" /><span className="h-6 w-px bg-[#dadce0]" /><span className="h-2 w-10 rounded bg-[#bdc1c6]" /><span className="h-2 w-14 rounded bg-[#bdc1c6]" /><span className="h-2 w-9 rounded bg-[#bdc1c6]" /></div>
                        <div className="space-y-4 px-3 py-8 sm:px-8 sm:py-12"><div className="h-7 w-3/4 rounded bg-[#202124]" /><div className="h-3 w-full rounded bg-[#e8eaed]" /><div className="h-3 w-11/12 rounded bg-[#e8eaed]" /><div className="h-3 w-4/5 rounded bg-[#e8eaed]" /><div className="pt-3"><div className="h-3 w-2/3 rounded bg-[#e8eaed]" /><div className="mt-3 h-3 w-3/4 rounded bg-[#e8eaed]" /></div></div>
                        <div className="flex items-center justify-between border-t border-[#f1f3f4] px-3 pt-3 text-xs text-[#5f6368]"><span className="inline-flex items-center gap-1.5"><LockKeyhole className="size-3.5" /> Saved when you choose</span><span>Shared with 2 people</span></div>
                    </div>
                </section>

                <section id="how-it-works" className="border-y border-[#e8eaed] bg-white"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1a73e8]">Everything you need</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">A document flow that stays out of your way.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-3"><Feature icon={<FileText />} title="Write clearly" text="Use the essentials: headings, emphasis, and lists in a clean, comfortable editor." /><Feature icon={<Share2 />} title="Share simply" text="Give teammates view or edit access and see shared documents in one place." /><Feature icon={<LockKeyhole />} title="Keep it yours" text="Your documents stay persisted and access is enforced for every request." /></div></div></section>
            </main>
        </>
    );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
    return <div className="rounded-2xl border border-[#dadce0] bg-[#f8f9fa] p-6"><div className="flex size-10 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#1a73e8] [&>svg]:size-5">{icon}</div><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#5f6368]">{text}</p></div>;
}
