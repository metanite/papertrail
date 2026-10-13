import type { InputHTMLAttributes } from 'react';

import { cn } from '@/common/utils';

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-lg border border-[#dadce0] bg-white px-3 text-sm text-[#202124] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/15',
        className,
      )}
      {...props}
    />
  );
}
