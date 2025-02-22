import React from 'react';

import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes } from '~/umbraco';

import ArticleSlider from '../article-slider';
import { CategoryCards } from '../categoryCards';
import CollapsibleBlocks from '../collapsible-blocks';
import { CTABanner } from '../cta-banner/cta-banner';
import Form from '../form';
import { ImageColumnSlideshow } from '../image-column-slider';
import { ImageColumns } from '../image-columns';
import { ProductCardCarousel } from '../product-card-carousel';
import { ProductList } from '../product-list';
import { RichTextBlock } from '../richtext/richtextBlock';
import { TextAndProductCard } from '../text-and-productcard';
import { UmbracoSlideshow } from '../umbracoSlideshow';
import { VideoPlayer } from '../video-player';

/**
 * A dictionary mapping Umbraco block types to React components. This is used in
 * the BlockList component to determine which component to render for a given
 * block. The keys are the names of the block types, and the values are the
 * components to render for each block type.
 */
export const BlockComponents: Record<string, React.ComponentType<BlockProps>> = {
  [BlockTypes.ProductCarouselSlider]: ProductCardCarousel,
  [BlockTypes.RichText]: RichTextBlock,
  [BlockTypes.Slideshow]: UmbracoSlideshow,
  [BlockTypes.CTABanner]: CTABanner,
  [BlockTypes.CategoryCards]: CategoryCards,
  [BlockTypes.CollapsibleBlocks]: CollapsibleBlocks,
  [BlockTypes.ImageColumns]: ImageColumns,
  [BlockTypes.ArticleSlider]: ArticleSlider,
  [BlockTypes.ProductList]: ProductList,
  [BlockTypes.ImageColumnSlideshow]: ImageColumnSlideshow,
  [BlockTypes.VideoPlayer]: VideoPlayer,
  [BlockTypes.TextAndProductCard]: TextAndProductCard,
  [BlockTypes.Form]: Form,
};
