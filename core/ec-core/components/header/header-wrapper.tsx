import { getLocale, getTranslations } from 'next-intl/server';
import PLazy from 'p-lazy';
import { cache } from 'react';

import { getSessionCustomerAccessToken } from '@/core/auth';
import { client } from '@/core/client';
import { graphql, readFragment } from '@/core/client/graphql';
import { revalidate } from '@/core/client/revalidate-target';
import { FooterFragment } from '@/core/components/footer/fragment';
import { TAGS } from '~/client/tags';
import { search } from '~/components/header/_actions/search';
import { switchCurrency } from '~/components/header/_actions/switch-currency';
import { switchLocale } from '~/components/header/_actions/switch-locale';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { SiteContentResponseModel } from '~/ec-core/umbracoClient';
import { routing } from '~/i18n/routing';
import { getCartId } from '~/lib/cart';
import { getPreferredCurrencyCode } from '~/lib/currency';

import { HeaderFragmentWithId } from './fragment';
import { HeaderSection } from './header-section';

const LayoutQuery = graphql(
  `
    query LayoutQuery {
      site {
        ...HeaderFragment
        ...FooterFragment
      }
    }
  `,
  [HeaderFragmentWithId, FooterFragment],
);

const getLayoutData = cache(async () => {
  const customerAccessToken = await getSessionCustomerAccessToken();

  const { data: response } = await client.fetch({
    document: LayoutQuery,
    customerAccessToken,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  return readFragment(HeaderFragmentWithId, response).site;
});

const getLogo = async () => {
  const data = await getLayoutData();

  return data.settings ? logoTransformer(data.settings) : '';
};

const getCurrencies = async () => {
  const data = await getLayoutData();

  if (!data.currencies.edges) {
    return [];
  }

  const currencies = data.currencies.edges
    // only show transactional currencies for now until cart prices can be rendered in display currencies
    .filter(({ node }) => node.isTransactional)
    .map(({ node }) => ({
      id: node.code,
      label: node.code,
      isDefault: node.isDefault,
    }));

  return currencies;
};

const getLinks = async () => {
  const data = await getLayoutData();

  return data.categoryTree.map(({ entityId, name, path, children }) => ({
    entityId,
    label: name,
    href: path,
    groups: children.map((firstChild) => ({
      entityId: firstChild.entityId,
      label: firstChild.name,
      href: firstChild.path,
      links: firstChild.children.map((secondChild) => ({
        entityId: secondChild.entityId,
        label: secondChild.name,
        href: secondChild.path,
      })),
    })),
  }));
};

const GetCartCountQuery = graphql(`
  query GetCartCountQuery($cartId: String) {
    site {
      cart(entityId: $cartId) {
        entityId
        lineItems {
          totalQuantity
        }
      }
    }
  }
`);

const getCartCount = async () => {
  const cartId = await getCartId();

  if (!cartId) {
    return null;
  }

  const customerAccessToken = await getSessionCustomerAccessToken();

  const response = await client.fetch({
    document: GetCartCountQuery,
    variables: { cartId },
    customerAccessToken,
    fetchOptions: {
      cache: 'no-store',
      next: {
        tags: [TAGS.cart],
      },
    },
  });

  if (!response.data.site.cart) {
    return null;
  }

  return response.data.site.cart.lineItems.totalQuantity;
};

export const ECHeader = async (site?: SiteContentResponseModel) => {
  const t = await getTranslations('Components.Header');
  const locale = await getLocale();
  const currencyCode = await getPreferredCurrencyCode();

  const locales = routing.locales.map((enabledLocales) => ({
    id: enabledLocales,
    label: enabledLocales.toLocaleUpperCase(),
  }));

  if (!site) {
    return null;
  }

  const umbracoData = site.properties.headerList?.items;

  const currencies = await getCurrencies();
  const defaultCurrency = currencies.find(({ isDefault }) => isDefault);
  const activeCurrencyId = currencyCode ?? defaultCurrency?.id;

  return (
    <HeaderSection
      navigation={{
        accountHref: '/login',
        accountLabel: t('Icons.account'),
        cartHref: '/cart',
        cartLabel: t('Icons.cart'),
        searchHref: '/search',
        searchLabel: t('Icons.search'),
        searchParamName: 'term',
        searchAction: search,
        links: getLinks(),
        logo: getLogo(),
        mobileMenuTriggerLabel: t('toggleNavigation'),
        openSearchPopupLabel: t('Search.openSearchPopup'),
        logoLabel: t('home'),
        cartCount: PLazy.from(getCartCount),
        activeLocaleId: locale,
        locales,
        localeAction: switchLocale,
        currencies,
        activeCurrencyId,
        currencyAction: switchCurrency,
        umbracoData,
      }}
    />
  );
};
