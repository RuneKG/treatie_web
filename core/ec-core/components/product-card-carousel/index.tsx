import { getTranslations } from 'next-intl/server';

import { CardProduct } from '@/vibes/soul/primitives/product-card';
import { ProductsCarousel } from '@/vibes/soul/primitives/products-carousel';
import { SectionLayout } from '@/vibes/soul/sections/section-layout';
import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/ec-core/umbraco';
import { ProductCarouselSliderPropertiesModel } from '~/ec-core/umbracoClient';

import {
  getBestSellingProducts,
  getFeaturedProducts,
  getNewestProducts,
} from '../frontpage-block-list/getProducts';

export type ProductsQuery =
  | 'newestProducts'
  | 'bestSellingProducts'
  | 'featuredProducts'
  | 'relatedProducts';

export const ProductCardCarousel = async ({ item }: BlockProps) => {
  const t = await getTranslations('Home');
  const productsProperties = PropertiesToModel<ProductCarouselSliderPropertiesModel>(
    BlockTypes.ProductCarouselSlider,
    item.content,
  );

  let items: CardProduct[] = [];

  switch (productsProperties?.productsQuery) {
    case 'bestSellingProducts':
      items = await getBestSellingProducts();
      break;

    case 'featuredProducts':
      items = await getFeaturedProducts();
      break;

    default:
      items = await getNewestProducts();
      break;
  }

  return (
    <SectionLayout className="group/pending" hideOverflow>
      <div className="mb-6 flex w-full flex-row flex-wrap items-end justify-between gap-x-8 gap-y-6 text-foreground @4xl:mb-8">
        <div>
          <h2 className="font-heading text-2xl leading-none @xl:text-3xl @4xl:text-4xl">
            {productsProperties?.headline ?? t('productCarouselSlider.title')}
          </h2>
        </div>
      </div>
      <div className="group-has-[[data-pending]]/pending:animate-pulse">
        <ProductsCarousel className="mb-14" products={items} />
      </div>
    </SectionLayout>
  );
};
