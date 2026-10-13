import { Head, Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

import Brand from '@/common/components/brand';
import { dashboard, login, register } from '@/routes';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as unknown as { auth?: { user?: { id: number } } };

    return (
        <>
            <Head title="Papertrail" />
            <div className="min-h-screen bg-[#f8f9fa] text-[#202124]">
                <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href={auth?.user ? dashboard() : '/'}><Brand /></Link>
                    <nav className="flex items-center gap-2 text-sm font-medium">
                        {auth?.user ? <Link href={dashboard()} className="rounded-lg px-4 py-2 text-[#1a73e8] hover:bg-[#e8f0fe]">Open workspace</Link> : <><Link href={login()} className="rounded-lg px-4 py-2 text-[#5f6368] hover:bg-white">Sign in</Link><Link href={register()} className="rounded-lg bg-[#1a73e8] px-4 py-2 text-white shadow-sm hover:bg-[#1765cc]">Create account</Link></>}
                    </nav>
                </header>
                {children}
            </div>
        </>
    );
}
