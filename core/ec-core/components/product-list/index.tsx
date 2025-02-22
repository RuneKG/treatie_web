import { SearchForm } from '@/core/components/search-form';
import { Pagination } from '@/core/components/ui/pagination';
import { ProductCard } from '@/vibes/soul/primitives/product-card';
import Container from '~/components/container';
import { BlockProps } from '~/ec-core/types/blockProps';
import { PropertiesToModel } from '~/umbraco';
import { ProductListPropertiesModel } from '~/umbracoClient';

import { fetchModifiedFacetedSearch } from './fetch-modified-faceted-search';

export async function ProductList({ searchParams, item }: BlockProps) {
  const params = await searchParams;

  const properties = PropertiesToModel<ProductListPropertiesModel>('productList', item.content);

  if (!properties || !params) {
    return null;
  }

  const search = await fetchModifiedFacetedSearch(params, properties);

  const productsCollection = search.products;
  const products = productsCollection.items;

  if (products.length === 0) {
    return (
      <Container>
        <SearchForm initialTerm={properties.searchTerm ?? undefined} />
      </Container>
    );
  }

  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <Container>
      <div className="grid grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard
            imagePriority={index <= 3}
            imageSizes="wide"
            key={product.entityId}
            product={{
              ...product,
              id: `${product.entityId}`,
              href: product.path,
              title: product.name,
              image: {
                src: product.defaultImage?.url ?? '',
                alt: product.defaultImage?.altText ?? '',
              },
            }}
          />
        ))}
      </div>

      {properties.showPagination && (
        <div className="flex justify-end">
          <Pagination
            endCursor={endCursor ?? undefined}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            startCursor={startCursor ?? undefined}
          />
        </div>
      )}
    </Container>
  );
}

export const runtime = 'edge';
