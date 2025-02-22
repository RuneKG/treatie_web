import { FragmentOf, graphql } from '@/core/client/graphql';

export const HeaderFragmentWithId = graphql(`
  fragment HeaderFragment on Site {
    settings {
      storeName
      logoV2 {
        __typename
        ... on StoreTextLogo {
          text
        }
        ... on StoreImageLogo {
          image {
            url: urlTemplate(lossy: true)
            altText
          }
        }
      }
    }
    categoryTree {
      entityId
      name
      path
      children {
        entityId
        name
        path
        children {
          entityId
          name
          path
        }
      }
    }
    currencies(first: 25) {
      edges {
        node {
          code
          isTransactional
          isDefault
        }
      }
    }
  }
`);

export type Currency = NonNullable<
  NonNullable<FragmentOf<typeof HeaderFragmentWithId>>['currencies']['edges']
>[number]['node'];
export type CurrencyCode = Currency['code'];
