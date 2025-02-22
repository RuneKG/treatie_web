import { cache } from 'react';
import { z } from 'zod';

import {
  getProductSearchResults,
  GetProductSearchResultsQuery,
  PublicSearchParamsSchema,
  PublicToPrivateParams,
} from '@/core/app/[locale]/(default)/(faceted)/fetch-faceted-search';
import { VariablesOf } from '~/client/graphql';
import { PropertiesToModel } from '~/umbraco';
import {
  BigCommerceProductAttributePropertiesModel,
  ProductListPropertiesModel,
} from '~/umbracoClient';

type Variables = VariablesOf<typeof GetProductSearchResultsQuery>;
type SearchProductsSortInput = Variables['sort'];
type SearchProductsFiltersInput = Variables['filters'];

function getPriceFilter(
  filters: SearchProductsFiltersInput,
  properties: ProductListPropertiesModel | undefined,
) {
  const priceNotSet = !properties?.minimumPrice && !properties?.maximumPrice;

  if (!filters.price && priceNotSet) {
    return undefined;
  }

  if (filters.price && priceNotSet) {
    return filters.price;
  }

  return {
    minPrice:
      filters.price?.minPrice ??
      (properties?.minimumPrice ? Number(properties.minimumPrice) : undefined),
    maxPrice:
      filters.price?.maxPrice ??
      (properties?.maximumPrice ? Number(properties.maximumPrice) : undefined),
  };
}

function getProductAttributes(properties: ProductListPropertiesModel | undefined) {
  return properties?.productAttributes?.items.reduce(
    (attributes: Array<{ attribute: string; values: string[] }>, attr) => {
      const attrProperties = PropertiesToModel<BigCommerceProductAttributePropertiesModel>(
        'bigCommerceProductAttribute',
        attr.content,
      );

      if (attrProperties?.attribute && attrProperties.values) {
        attributes.push({
          attribute: attrProperties.attribute,
          values: attrProperties.values,
        });
      }

      return attributes;
    },
    [],
  );
}

function getRatingFilter(
  filters: SearchProductsFiltersInput,
  properties: ProductListPropertiesModel | undefined,
) {
  if (!filters.rating && !properties?.minimumRating && !properties?.maximumRating) {
    return undefined;
  }

  if (filters.rating && !properties?.minimumRating && !properties?.maximumRating) {
    return filters.rating;
  }

  return {
    minRating:
      filters.rating?.minRating ??
      (properties?.minimumRating ? Number(properties.minimumRating) : undefined),
    maxRating:
      filters.rating?.maxRating ??
      (properties?.maximumRating ? Number(properties.maximumRating) : undefined),
  };
}

export const fetchModifiedFacetedSearch = cache(
  // We need to make sure the reference passed into this function is the same if we want it to be memoized.
  async (
    params: z.input<typeof PublicSearchParamsSchema>,
    properties: ProductListPropertiesModel | undefined = undefined,
  ) => {
    const {
      after,
      before,
      limit = (properties?.rows ?? 3) * 4,
      // Type is already declared from umbraco
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      sort = properties?.sort as SearchProductsSortInput,
      filters,
    } = PublicToPrivateParams.parse(params);

    const modifiedFilters: SearchProductsFiltersInput = {
      ...filters,
      brandEntityIds: properties?.brandIds
        ? properties.brandIds.map((id) => Number(id)).filter((id) => !Number.isNaN(id))
        : filters.brandEntityIds,
      categoryEntityIds: properties?.categoryIds
        ? properties.categoryIds.map(Number)
        : filters.categoryEntityIds,
      hideOutOfStock: filters.hideOutOfStock ?? properties?.hideOutOfStock ?? undefined,
      isFreeShipping:
        filters.isFreeShipping ?? (properties?.freeShipping ? true : undefined) ?? undefined,
      isFeatured: filters.isFeatured ?? properties?.featured ?? undefined,
      price: getPriceFilter(filters, properties),
      productAttributes: getProductAttributes(properties),
      rating: getRatingFilter(filters, properties),
      searchTerm: filters.searchTerm ?? properties?.searchTerm ?? undefined,
    };

    return getProductSearchResults({
      after,
      before,
      limit,
      sort,
      filters: modifiedFilters,
    });
  },
);
