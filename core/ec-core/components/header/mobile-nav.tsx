import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { useTranslations } from 'next-intl';
import { ReactElement } from 'react';

import { MobileMenuButton } from '@/vibes/soul/primitives/navigation';
import { MegaMenuPropertiesModel } from '~/umbracoClient';

import { CategoryTree } from './headerTypes';
import { BigCCategoryParent } from './navigation/category-components/bigCCategoryParent';
import { UmbracoCategoryParent } from './navigation/category-components/umbracoCategoryParent';

interface Props {
  umbracoLinks: MegaMenuPropertiesModel[];
  categoryTree: CategoryTree;
  links: CategoryTree;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  logo?: ReactElement;
  mobileMenuTriggerLabel?: string;
}

export const MobileNav = ({
  umbracoLinks,
  links,
  categoryTree,
  logo,
  mobileMenuTriggerLabel,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: Props) => {
  const t = useTranslations('Components.Header.Navigation');

  return (
    <SheetPrimitive.Root onOpenChange={setIsMobileMenuOpen} open={isMobileMenuOpen}>
      <SheetPrimitive.Trigger asChild>
        <MobileMenuButton
          aria-label={mobileMenuTriggerLabel}
          className="mr-1 @4xl:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          open={isMobileMenuOpen}
        />
      </SheetPrimitive.Trigger>
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 @4xl:hidden" />
        <SheetPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 left-0 z-50 h-full w-3/4 overflow-auto border-r bg-white p-6 pt-0 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left @4xl:hidden sm:max-w-sm"
        >
          <SheetPrimitive.Title asChild>
            <h2 className="sr-only">{t('navigationMenu')}</h2>
          </SheetPrimitive.Title>
          <div className="flex h-16 items-center justify-between">
            {logo}
            <MobileMenuButton
              aria-label={mobileMenuTriggerLabel}
              className="mr-1"
              onClick={() => setIsMobileMenuOpen(false)}
              open={isMobileMenuOpen}
            />
          </div>
          <NavigationMenuPrimitive.Root orientation="vertical">
            <NavigationMenuPrimitive.List className="flex flex-col gap-2 pb-6 @4xl:gap-4">
              {umbracoLinks.map((link) => (
                <UmbracoCategoryParent
                  categoryTree={categoryTree}
                  key={link.bigCCategoryId}
                  link={link}
                />
              ))}
              {links.map((link) => (
                <BigCCategoryParent key={link.href} link={link} setOpen={setIsMobileMenuOpen} />
              ))}
            </NavigationMenuPrimitive.List>
          </NavigationMenuPrimitive.Root>
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    </SheetPrimitive.Root>
  );
};
