import type { LabelHTMLAttributes } from 'react';

export function Label({
  className = '',
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium text-[#3c4043] ${className}`}
      {...props}
    />
  );
}
