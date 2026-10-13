import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/common/utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
};

export function Button({
  className,
  asChild = false,
  variant = 'default',
  size = 'default',
  ...props
}: Props) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-[#1a73e8]/40 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-[#1a73e8] text-white hover:bg-[#1765cc]',
        variant === 'outline' &&
          'border border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f8f9fa]',
        variant === 'ghost' && 'text-[#5f6368] hover:bg-[#f1f3f4]',
        size === 'sm' && 'h-8 px-3 text-xs',
        size === 'lg' && 'h-11 px-5',
        size === 'default' && 'h-10 px-4',
        className,
      )}
      {...props}
    />
  );
}
