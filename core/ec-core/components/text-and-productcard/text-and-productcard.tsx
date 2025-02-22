import { getProductData as getProduct } from '@/core/app/[locale]/(default)/product/[slug]/page-data';
import { ProductCard } from '@/vibes/soul/primitives/product-card';
import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { TextAndProductCardPropertiesModel } from '~/umbracoClient';

import Container from '../container';
import { RichText } from '../richtext';

export const TextAndProductCard = async ({ item }: BlockProps) => {
  const properties = PropertiesToModel<TextAndProductCardPropertiesModel>(
    BlockTypes.TextAndProductCard,
    item.content,
  );

  if (!properties) return null;
  if (!properties.bigcommerceProductId) return null;

  let product;

  try {
    product = await getProduct({
      entityId: parseInt(properties.bigcommerceProductId, 10),
      useDefaultOptionSelections: true,
    });
  } catch {
    // Only catch to not land on 404, which is returned from getProduct if not found
  }

  if (!product) {
    return null;
  }

  const productCard = (
    <div className="col-span-2">
      <ProductCard
        product={{
          ...product,
          id: `${product.entityId}`,
          href: product.path,
          title: product.name,
          image: { src: product.defaultImage?.url ?? '', alt: product.defaultImage?.altText ?? '' },
        }}
        showCompare={false}
      />
    </div>
  );

  return (
    <Container className="mb-8">
      <div className="grid grid-cols-5 gap-24">
        {!properties.placement && productCard}
        <RichText className="col-span-3" markup={properties.richText?.markup ?? ''} />
        {properties.placement && productCard}
      </div>
    </Container>
  );
};
