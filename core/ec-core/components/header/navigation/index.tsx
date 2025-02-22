'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Popover from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { Search, ShoppingBag, User } from 'lucide-react';
import React, { forwardRef, Ref, useEffect, useState } from 'react';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { Logo } from '@/vibes/soul/primitives/logo';
import {
  CurrencyForm,
  LocaleForm,
  Props,
  SearchForm,
  SearchResult,
} from '@/vibes/soul/primitives/navigation';
import { Link } from '~/components/link';
import { PropertiesToModel } from '~/ec-core/umbraco';
import { ApiBlockGridItemModel, MegaMenuPropertiesModel } from '~/ec-core/umbracoClient';
import { usePathname } from '~/i18n/routing';

import { CategoryTree } from '../headerTypes';
import { MobileNav } from '../mobile-nav';

import { BigCCategoryParent } from './category-components/bigCCategoryParent';
import { UmbracoCategoryParent } from './category-components/umbracoCategoryParent';

interface Locale {
  id: string;
  label: string;
}

interface Currency {
  id: string;
  label: string;
}

interface EcHeaderProps extends Omit<Props<SearchResult>, 'links'> {
  umbracoData?: ApiBlockGridItemModel[];
  links: Streamable<CategoryTree>;
}

const navButtonClassName =
  'relative rounded-lg bg-[var(--nav-button-background,transparent)] p-1.5 text-[var(--nav-button-icon,hsl(var(--foreground)))] ring-[var(--nav-focus,hsl(var(--primary)))] transition-colors focus-visible:outline-0 focus-visible:ring-2 @4xl:hover:bg-[var(--nav-button-background-hover,hsl(var(--contrast-100)))] @4xl:hover:text-[var(--nav-button-icon-hover,hsl(var(--foreground)))]';

/**
 * This component supports various CSS variables for theming. Here's a comprehensive list, along
 * with their default values:
 *
 * ```css
 * :root {
 *   --nav-focus: hsl(var(--primary));
 *   --nav-background: hsl(var(--background));
 *   --nav-floating-border: hsl(var(--foreground) / 10%);
 *   --nav-link-text: hsl(var(--foreground));
 *   --nav-link-text-hover: hsl(var(--foreground));
 *   --nav-link-background: transparent;
 *   --nav-link-background-hover: hsl(var(--contrast-100));
 *   --nav-link-font-family: var(--font-family-body);
 *   --nav-group-text: hsl(var(--foreground));
 *   --nav-group-text-hover: hsl(var(--foreground));
 *   --nav-group-background: transparent;
 *   --nav-group-background-hover: hsl(var(--contrast-100));
 *   --nav-group-font-family: var(--font-family-body);
 *   --nav-sub-link-text: hsl(var(--contrast-500));
 *   --nav-sub-link-text-hover: hsl(var(--foreground));
 *   --nav-sub-link-background: transparent;
 *   --nav-sub-link-background-hover: hsl(var(--contrast-100));
 *   --nav-sub-link-font-family: var(--font-family-body);
 *   --nav-button-icon: hsl(var(--foreground));
 *   --nav-button-icon-hover: hsl(var(--foreground));
 *   --nav-button-background: hsl(var(--background));
 *   --nav-button-background-hover: hsl(var(--contrast-100));
 *   --nav-menu-background: hsl(var(--background));
 *   --nav-menu-border: hsl(var(--foreground) / 5%);
 *   --nav-mobile-background: hsl(var(--background));
 *   --nav-mobile-divider: hsl(var(--contrast-100));
 *   --nav-mobile-button-icon: hsl(var(--foreground));
 *   --nav-mobile-link-text: hsl(var(--foreground));
 *   --nav-mobile-link-text-hover: hsl(var(--foreground));
 *   --nav-mobile-link-background: transparent;
 *   --nav-mobile-link-background-hover: hsl(var(--contrast-100));
 *   --nav-mobile-link-font-family: var(--font-family-body);
 *   --nav-mobile-sub-link-text: hsl(var(--contrast-500));
 *   --nav-mobile-sub-link-text-hover: hsl(var(--foreground));
 *   --nav-mobile-sub-link-background: transparent;
 *   --nav-mobile-sub-link-background-hover: hsl(var(--contrast-100));
 *   --nav-mobile-sub-link-font-family: var(--font-family-body);
 *   --nav-search-background: hsl(var(--background));
 *   --nav-search-border: hsl(var(--foreground) / 5%);
 *   --nav-search-divider: hsl(var(--foreground) / 5%);
 *   --nav-search-icon: hsl(var(--contrast-500));
 *   --nav-search-empty-title: hsl(var(--foreground));
 *   --nav-search-empty-subtitle: hsl(var(--contrast-500));
 *   --nav-search-result-title: hsl(var(--foreground));
 *   --nav-search-result-title-font-family: var(--font-family-mono);
 *   --nav-search-result-link-text: hsl(var(--foreground));
 *   --nav-search-result-link-text-hover: hsl(var(--foreground));
 *   --nav-search-result-link-background: hsl(var(--background));
 *   --nav-search-result-link-background-hover: hsl(var(--contrast-100));
 *   --nav-search-result-link-font-family: var(--font-family-body);
 *   --nav-cart-count-text: hsl(var(--background));
 *   --nav-cart-count-background: hsl(var(--foreground));
 *   --nav-locale-background: hsl(var(--background));
 *   --nav-locale-link-text: hsl(var(--contrast-400));
 *   --nav-locale-link-text-hover: hsl(var(--foreground));
 *   --nav-locale-link-text-selected: hsl(var(--foreground));
 *   --nav-locale-link-background: transparent;
 *   --nav-locale-link-background-hover: hsl(var(--contrast-100));
 *   --nav-locale-link-font-family: var(--font-family-body);
 * }
 * ```
 */
export const Navigation = forwardRef(function Navigation(
  {
    className,
    isFloating = false,
    cartHref,
    cartCount: streamableCartCount,
    accountHref,
    links: streamableLinks,
    logo: streamableLogo,
    logoHref = '/',
    logoLabel = 'Home',
    logoWidth = 200,
    logoHeight = 40,
    mobileLogo: streamableMobileLogo,
    mobileLogoWidth = 100,
    mobileLogoHeight = 40,
    linksPosition = 'center',
    activeLocaleId,
    localeAction,
    locales,
    currencies,
    activeCurrencyId,
    currencyAction,
    searchHref,
    searchParamName = 'query',
    searchAction,
    searchCtaLabel,
    searchInputPlaceholder,
    cartLabel = 'Cart',
    accountLabel = 'Profile',
    openSearchPopupLabel = 'Open search popup',
    searchLabel = 'Search',
    mobileMenuTriggerLabel = 'Toggle navigation',
    umbracoData,
  }: EcHeaderProps,
  ref: Ref<HTMLDivElement>,
) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const maxItemsLen = 6;
  const maxItemsLenSmall = 3;

  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      setIsSearchOpen(false);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const umbracoLinks = (umbracoData ?? [])
    .map((link) => PropertiesToModel<MegaMenuPropertiesModel>('megaMenu', link.content))
    .filter((l) => l !== null)
    .slice(0, maxItemsLen);

  const sanitzeBigcommerceLinks = (links: CategoryTree) =>
    links
      .filter((cat) => umbracoLinks.some((c) => c.bigCCategoryId !== cat.entityId))
      .slice(0, maxItemsLen - umbracoLinks.length);

  const headerLogo = (
    <div
      className={clsx(
        'ml-1 flex items-center justify-start self-stretch pl-2',
        linksPosition === 'center' ? 'flex-1' : 'flex-1 @4xl:flex-none',
      )}
    >
      <Logo
        className={clsx(streamableMobileLogo != null ? 'hidden @4xl:flex' : 'flex')}
        height={logoHeight}
        href={logoHref}
        label={logoLabel}
        logo={streamableLogo}
        width={logoWidth}
      />
      {streamableMobileLogo != null && (
        <Logo
          className="flex @4xl:hidden"
          height={mobileLogoHeight}
          href={logoHref}
          label={logoLabel}
          logo={streamableMobileLogo}
          width={mobileLogoWidth}
        />
      )}
    </div>
  );

  return (
    <NavigationMenu.Root
      className={clsx('relative mx-auto w-full max-w-screen-2xl @container', className)}
      delayDuration={0}
      onValueChange={() => setIsSearchOpen(false)}
      ref={ref}
    >
      <div
        className={clsx(
          'flex items-center justify-between gap-1 bg-[var(--nav-background,hsl(var(--background)))] py-2 pl-3 pr-2 transition-shadow @4xl:rounded-2xl @4xl:px-2 @4xl:pl-6 @4xl:pr-2.5',
          isFloating
            ? 'shadow-xl ring-1 ring-[var(--nav-floating-border,hsl(var(--foreground)/10%))]'
            : 'shadow-none ring-0',
        )}
      >
        {/* Mobile Menu */}
        <div className="flex h-6 w-6 items-center gap-2 md:gap-4">
          <Stream value={streamableLinks}>
            {(links) => (
              <MobileNav
                categoryTree={links}
                isMobileMenuOpen={isMobileMenuOpen}
                links={sanitzeBigcommerceLinks(links)}
                logo={headerLogo}
                mobileMenuTriggerLabel={mobileMenuTriggerLabel}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                umbracoLinks={umbracoLinks}
              />
            )}
          </Stream>
        </div>
        {/* Logo */}
        {headerLogo}
        {/* Top Level Nav Links */}
        <ul
          className={clsx(
            'hidden gap-1 @4xl:flex @4xl:flex-1',
            {
              left: '@4xl:justify-start',
              center: '@4xl:justify-center',
              right: '@4xl:justify-end',
            }[linksPosition],
          )}
        >
          <Stream
            fallback={
              <ul className="flex animate-pulse flex-row p-2 @4xl:gap-2 @4xl:p-5">
                <li>
                  <span className="block h-4 w-10 rounded-md bg-contrast-100" />
                </li>
                <li>
                  <span className="block h-4 w-14 rounded-md bg-contrast-100" />
                </li>
                <li>
                  <span className="block h-4 w-24 rounded-md bg-contrast-100" />
                </li>
                <li>
                  <span className="block h-4 w-16 rounded-md bg-contrast-100" />
                </li>
              </ul>
            }
            value={streamableLinks}
          >
            {(links) => {
              const umbracoNodes = umbracoLinks.map((link, index) => (
                <UmbracoCategoryParent
                  categoryTree={links}
                  className={index > maxItemsLen - maxItemsLenSmall - 1 ? 'hidden xl:block' : ''}
                  contentClassname={isFloating ? '' : 'rounded-t-none mx-0'}
                  key={link.bigCCategoryId}
                  link={link}
                />
              ));

              const bigcommerceNodes = sanitzeBigcommerceLinks(links).map((item, i) => (
                <BigCCategoryParent
                  contentClassname={isFloating ? '' : 'rounded-t-none mx-0'}
                  key={i}
                  link={item}
                />
              ));

              return [...umbracoNodes, ...bigcommerceNodes];
            }}
          </Stream>
        </ul>
        {/* Icon Buttons */}
        <div
          className={clsx(
            'flex items-center justify-end gap-0.5 transition-colors duration-300',
            linksPosition === 'center' ? 'flex-1' : 'flex-1 @4xl:flex-none',
          )}
        >
          {searchAction ? (
            <Popover.Root onOpenChange={setIsSearchOpen} open={isSearchOpen}>
              <Popover.Anchor className="absolute left-0 right-0 top-full" />
              <Popover.Trigger asChild>
                <button
                  aria-label={openSearchPopupLabel}
                  className={navButtonClassName}
                  onPointerEnter={(e) => e.preventDefault()}
                  onPointerLeave={(e) => e.preventDefault()}
                  onPointerMove={(e) => e.preventDefault()}
                >
                  <Search size={20} strokeWidth={1} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="max-h-[calc(var(--radix-popover-content-available-height)-16px)] w-[var(--radix-popper-anchor-width)] py-2 @container data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                  <div className="flex max-h-[inherit] flex-col rounded-2xl bg-[var(--nav-search-background,hsl(var(--background)))] shadow-xl ring-1 ring-[var(--nav-search-border,hsl(var(--foreground)/5%))] transition-all duration-200 ease-in-out @4xl:inset-x-0">
                    <SearchForm
                      searchAction={searchAction}
                      searchCtaLabel={searchCtaLabel}
                      searchHref={searchHref}
                      searchInputPlaceholder={searchInputPlaceholder}
                      searchParamName={searchParamName}
                    />
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ) : (
            <Link aria-label={searchLabel} className={navButtonClassName} href={searchHref}>
              <Search size={20} strokeWidth={1} />
            </Link>
          )}

          <Link aria-label={accountLabel} className={navButtonClassName} href={accountHref}>
            <User size={20} strokeWidth={1} />
          </Link>
          <Link aria-label={cartLabel} className={navButtonClassName} href={cartHref}>
            <ShoppingBag size={20} strokeWidth={1} />
            <Stream
              fallback={
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-contrast-100 text-xs text-background" />
              }
              value={streamableCartCount}
            >
              {(cartCount) =>
                cartCount != null &&
                cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--nav-cart-count-background,hsl(var(--foreground)))] font-[family-name:var(--nav-cart-count-font-family,var(--font-family-body))] text-xs text-[var(--nav-cart-count-text,hsl(var(--background)))]">
                    {cartCount}
                  </span>
                )
              }
            </Stream>
          </Link>

          {/* Locale / Language Dropdown */}
          {locales && locales.length > 1 && localeAction ? (
            <LocaleForm
              action={localeAction}
              activeLocaleId={activeLocaleId}
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              locales={locales as [Locale, Locale, ...Locale[]]}
            />
          ) : null}

          {/* Currency Dropdown */}
          {currencies && currencies.length > 1 && currencyAction ? (
            <CurrencyForm
              action={currencyAction}
              activeCurrencyId={activeCurrencyId}
              currencies={currencies as [Currency, ...Currency[]]}
            />
          ) : null}
        </div>
      </div>

      <div className="perspective-[2000px] absolute left-0 right-0 top-full z-50 flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-2 w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" />
      </div>
    </NavigationMenu.Root>
  );
});

Navigation.displayName = 'Navigation';
