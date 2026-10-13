import { Head, Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, HelpCircle, LogOut, Settings } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import Brand from '@/common/components/brand';
import FeedbackBanner from '@/common/components/feedback-banner';
import type { User } from '@/types/auth';

type Props = PropsWithChildren<{ title?: string }>;

export default function AppLayout({ children, title = 'Papertrail' }: Props) {
  const { auth } = usePage().props as unknown as { auth: { user: User } };
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-[#f8f9fa] text-[#202124]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-5 border-b border-[#dadce0] bg-white px-4 shadow-[0_1px_2px_rgba(60,64,67,.08)] sm:px-6">
          <Link href="/dashboard" aria-label="Papertrail home">
            <Brand />
          </Link>
          <div className="hidden h-8 w-px bg-[#dadce0] sm:block" />
          <Link
            href="/dashboard"
            className="hidden text-sm text-[#5f6368] transition hover:text-[#202124] sm:block"
          >
            My documents
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Help"
              title="Help"
              className="hidden size-9 items-center justify-center rounded-full text-[#5f6368] hover:bg-[#f1f3f4] sm:flex"
            >
              <HelpCircle className="size-5" />
            </button>
            <Link
              href="/settings/profile"
              aria-label="Settings"
              title="Settings"
              className="hidden size-9 items-center justify-center rounded-full text-[#5f6368] hover:bg-[#f1f3f4] sm:flex"
            >
              <Settings className="size-5" />
            </Link>
            <div className="relative ml-1">
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-[#dadce0] py-1 pr-2 pl-1 text-sm hover:bg-[#f8f9fa]"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-[#d3e3fd] text-xs font-semibold text-[#174ea6]">
                  {auth.user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-32 truncate sm:block">
                  {auth.user.name}
                </span>
                <ChevronDown className="size-3.5 text-[#5f6368]" />
              </button>
              {userMenuOpen && (
                <div
                  className="absolute top-11 right-0 z-30 w-52 rounded-xl border border-[#dadce0] bg-white p-1.5 shadow-[0_4px_16px_rgba(60,64,67,.18)]"
                  role="menu"
                >
                  <div className="border-b border-[#f1f3f4] px-3 py-2">
                    <p className="truncate text-sm font-medium">
                      {auth.user.name}
                    </p>
                    <p className="truncate text-xs text-[#5f6368]">
                      {auth.user.email}
                    </p>
                  </div>
                  <Link
                    href="/settings/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#3c4043] hover:bg-[#f1f3f4]"
                    role="menuitem"
                  >
                    <Settings className="size-4" /> Settings
                  </Link>
                  <button
                    type="button"
                    onClick={() => router.post('/logout')}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#3c4043] hover:bg-[#f1f3f4]"
                    role="menuitem"
                  >
                    <LogOut className="size-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <FeedbackBanner />
        {children}
      </div>
    </>
  );
}
