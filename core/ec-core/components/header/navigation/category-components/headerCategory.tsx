import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';

import { Link } from '~/components/link';
import { cn } from '~/lib/utils';

export function HeaderCategory({
  className,
  contentClassname,
  href,
  label,
  children,
}: {
  className: string | undefined;
  href: string;
  label: string;
  contentClassname: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenu.Item className={className} key={href}>
      <NavigationMenu.Trigger className="group/button flex w-full items-center justify-between gap-4 whitespace-nowrap rounded-xl bg-[var(--nav-link-background,transparent)] p-2.5 font-[family-name:var(--nav-link-font-family,var(--font-family-body))] text-sm font-medium text-[var(--nav-link-text,hsl(var(--foreground)))] ring-[var(--nav-focus,hsl(var(--primary)))] transition-colors duration-200 hover:bg-[var(--nav-link-background-hover,hsl(var(--contrast-100)))] hover:text-[var(--nav-link-text-hover,hsl(var(--foreground)))] focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-primary/20 @4xl:inline-flex @4xl:justify-normal @4xl:gap-1">
        <Link href={href}>{label}</Link>
        <ChevronDown
          aria-hidden="true"
          className="cursor-pointer transition duration-200 group-data-[state=open]/button:-rotate-180"
          size="21px"
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className={cn(
          'flex flex-col rounded-2xl bg-white py-4 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 @4xl:grid @4xl:grid-cols-4 @4xl:gap-x-20 @4xl:px-12 @4xl:py-8 2xl:mx-auto',
          contentClassname,
        )}
      >
        {children}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
