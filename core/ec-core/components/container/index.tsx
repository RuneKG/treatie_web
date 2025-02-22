import { cn } from '@/core/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div
      className={cn(className, 'flex-1 px-4 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0')}
    >
      {children}
    </div>
  );
}
