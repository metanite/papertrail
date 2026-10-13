import { Form, Head, Link } from '@inertiajs/react';

import Brand from '@/common/components/brand';
import FieldError from '@/common/components/field-error';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = { passwordRules: string };

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Create your account" />
            <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[1fr_420px] lg:px-10">
                <div className="hidden max-w-xl lg:block"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1a73e8]">Make space for the work</p><h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.04em]">A simple home for your next great document.</h1><p className="mt-5 text-lg leading-8 text-[#5f6368]">Create, format, and share in minutes. No busy setup, no learning curve.</p><div className="mt-8 space-y-3 text-sm text-[#5f6368]"><p>✓ Start with a clean, focused page</p><p>✓ Invite teammates when you are ready</p><p>✓ Keep every change in one place</p></div></div>
                <div className="rounded-2xl border border-[#dadce0] bg-white p-7 shadow-[0_8px_30px_rgba(60,64,67,.1)] sm:p-9"><div className="mb-8 lg:hidden"><Brand /></div><h2 className="text-2xl font-semibold tracking-tight">Create your account</h2><p className="mt-2 text-sm text-[#5f6368]">Set up your workspace and start writing.</p><Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} disableWhileProcessing className="mt-8 space-y-4">{({ processing, errors }) => <><div><Label htmlFor="name">Name</Label><Input id="name" name="name" required autoFocus autoComplete="name" className="mt-2" placeholder="Your name" /><FieldError message={errors.name} /></div><div><Label htmlFor="email">Email address</Label><Input id="email" name="email" type="email" required autoComplete="email" className="mt-2" placeholder="you@example.com" /><FieldError message={errors.email} /></div><div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required autoComplete="new-password" passwordrules={passwordRules} className="mt-2" placeholder="Create a password" /><FieldError message={errors.password} /></div><div><Label htmlFor="password_confirmation">Confirm password</Label><Input id="password_confirmation" name="password_confirmation" type="password" required autoComplete="new-password" passwordrules={passwordRules} className="mt-2" placeholder="Repeat your password" /><FieldError message={errors.password_confirmation} /></div><Button type="submit" className="mt-3 w-full" disabled={processing}>{processing ? 'Creating account…' : 'Create account'}</Button></>}</Form><p className="mt-7 text-center text-sm text-[#5f6368]">Already have an account? <Link href={login()} className="font-medium text-[#1a73e8] hover:underline">Sign in</Link></p></div>
            </main>
        </>
    );
}
