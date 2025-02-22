import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { Link } from '~/components/link';

export function SingleHeaderCategory({
  className,
  label,
  contentHref,
}: {
  className?: string;
  label?: string | null;
  contentHref: string;
}) {
  return (
    <NavigationMenu.Item className={className}>
      <NavigationMenu.Link
        asChild
        className="group/button flex items-center justify-between gap-1 whitespace-nowrap rounded-xl bg-[var(--nav-link-background,transparent)] p-2.5 font-[family-name:var(--nav-link-font-family,var(--font-family-body))] text-sm font-medium text-[var(--nav-link-text,hsl(var(--foreground)))] ring-[var(--nav-focus,hsl(var(--primary)))] transition-colors duration-200 hover:bg-[var(--nav-link-background-hover,hsl(var(--contrast-100)))] hover:text-[var(--nav-link-text-hover,hsl(var(--foreground)))] focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-primary/20 @4xl:flex @4xl:inline-flex @4xl:justify-normal"
      >
        <Link href={contentHref}>{label}</Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
