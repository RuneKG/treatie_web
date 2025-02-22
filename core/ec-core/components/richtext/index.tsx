import { cn } from '@/core/lib/utils';

export function RichText({ markup, className }: { markup: string; className?: string }) {
  return (
    <div
      className={cn('prose w-full max-w-full font-light', className)}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
