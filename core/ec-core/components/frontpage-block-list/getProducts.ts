'use server';

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getFormatter } from 'next-intl/server';

import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { FeaturedProductsCarouselFragment } from '~/components/featured-products-carousel/fragment';
import { FeaturedProductsListFragment } from '~/components/featured-products-list/fragment';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { getPreferredCurrencyCode } from '~/lib/currency';

const FeaturedPageQuery = graphql(
  `
    query FeaturedPageQuery($currencyCode: currencyCode) {
      site {
        featuredProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsCarouselFragment
            }
          }
        }
      }
    }
  `,
  [FeaturedProductsCarouselFragment],
);

const NewestPageQuery = graphql(
  `
    query NewestPageQuery($currencyCode: currencyCode) {
      site {
        newestProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsCarouselFragment
            }
          }
        }
      }
    }
  `,
  [FeaturedProductsCarouselFragment],
);

const BestSellingPageQuery = graphql(
  `
    query BestSellingPageQuery($currencyCode: currencyCode) {
      site {
        bestSellingProducts(first: 12) {
          edges {
            node {
              ...FeaturedProductsCarouselFragment
            }
          }
        }
      }
    }
  `,
  [FeaturedProductsCarouselFragment],
);

export const getFeaturedProducts = async () => {
  const customerAccessToken = await getSessionCustomerAccessToken();
  const currencyCode = await getPreferredCurrencyCode();
  const { data } = await client.fetch({
    document: FeaturedPageQuery,
    customerAccessToken,
    variables: { currencyCode },
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });
  const format = await getFormatter();

  const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);

  return productCardTransformer(featuredProducts, format);
};

export const getNewestProducts = async () => {
  const customerAccessToken = await getSessionCustomerAccessToken();
  const currencyCode = await getPreferredCurrencyCode();
  const { data } = await client.fetch({
    document: NewestPageQuery,
    customerAccessToken,
    variables: { currencyCode },
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });
  const format = await getFormatter();

  const newestProducts = removeEdgesAndNodes(data.site.newestProducts);

  return productCardTransformer(newestProducts, format);
};

export const getBestSellingProducts = async () => {
  const customerAccessToken = await getSessionCustomerAccessToken();
  const currencyCode = await getPreferredCurrencyCode();
  const { data } = await client.fetch({
    document: BestSellingPageQuery,
    customerAccessToken,
    variables: { currencyCode },
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });
  const format = await getFormatter();

  const bestSellingProducts = removeEdgesAndNodes(data.site.bestSellingProducts);

  return productCardTransformer(bestSellingProducts, format);
};
