import { FileText } from 'lucide-react';

import { cn } from '@/common/utils';

export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={cn('inline-flex items-center gap-2.5', compact && 'gap-2')}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-[#1a73e8] text-white shadow-sm">
        <FileText className="size-4" />
      </span>
      {!compact && (
        <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#202124]">
          Papertrail
        </span>
      )}
    </span>
  );
}
