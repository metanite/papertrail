import { Form, Head, Link } from '@inertiajs/react';

import Brand from '@/common/components/brand';
import FieldError from '@/common/components/field-error';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Label } from '@/shadcn/label';
import { register } from '@/routes';
import { store } from '@/routes/login';

type Props = { status?: string; canResetPassword: boolean };

export default function Login({ status, canResetPassword }: Props) {
  return (
    <>
      <Head title="Sign in" />
      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[1fr_420px] lg:px-10">
        <div className="hidden max-w-xl lg:block">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#1a73e8] uppercase">
            Welcome back
          </p>
          <h1 className="mt-4 text-5xl leading-tight font-semibold tracking-[-0.04em]">
            Pick up where your best ideas left off.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#5f6368]">
            Your documents, shared work, and quiet writing space are waiting.
          </p>
        </div>
        <div className="rounded-2xl border border-[#dadce0] bg-white p-7 shadow-[0_8px_30px_rgba(60,64,67,.1)] sm:p-9">
          <div className="mb-8 lg:hidden">
            <Brand />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Sign in to Papertrail
          </h2>
          <p className="mt-2 text-sm text-[#5f6368]">
            Use your account to open your workspace.
          </p>
          <Form
            {...store.form()}
            resetOnSuccess={['password']}
            className="mt-8 space-y-5"
          >
            {({ processing, errors }) => (
              <>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    className="mt-2"
                    placeholder="you@example.com"
                  />
                  <FieldError message={errors.email} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {canResetPassword && (
                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-[#1a73e8] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="mt-2"
                    placeholder="Your password"
                  />
                  <FieldError message={errors.password} />
                </div>
                <label className="flex items-center gap-2 text-sm text-[#5f6368]">
                  <input
                    name="remember"
                    type="checkbox"
                    className="size-4 rounded border-[#dadce0]"
                  />{' '}
                  Remember me
                </label>
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Signing in…' : 'Sign in'}
                </Button>
                {status && (
                  <p className="text-center text-sm text-green-600">{status}</p>
                )}
              </>
            )}
          </Form>
          <p className="mt-7 text-center text-sm text-[#5f6368]">
            New to Papertrail?{' '}
            <Link
              href={register()}
              className="font-medium text-[#1a73e8] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
