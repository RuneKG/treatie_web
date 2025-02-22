'use client';

import { Image } from '@/core/components/image';
import { cn } from '@/core/lib/utils';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { BlockComponentTypes } from '~/umbraco/constants/BlockTypes';
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  ImageColumnsPropertiesModel,
  ImageWithLinkPropertiesModel,
} from '~/umbracoClient';
import { umbracoImageUrl } from '~/util/utils';

import Container from '../container';
import { RichText } from '../richtext';

interface Props {
  item: ApiBlockItemModel | ApiBlockGridItemModel;
}

const ColumnImage = ({ item }: { item: ApiBlockGridItemModel }) => {
  const properties = PropertiesToModel<ImageWithLinkPropertiesModel>(
    BlockComponentTypes.ImageWithLink,
    item.content,
  );

  if (!properties) {
    return null;
  }

  if (!properties.image?.[0]?.url) {
    return null;
  }

  return (
    <div className="aspect-16/10 md:aspect-4/5 relative rounded-[var(--product-card-border-radius,1rem)] md:flex-auto">
      <Image
        alt={properties.image[0].name}
        className="rounded-[inherit] object-cover"
        fill
        sizes="(max-width: 768px) 45vw, (max-width: 1536px) 22vw, 500px"
        src={umbracoImageUrl(properties.image[0].url)}
      />
    </div>
  );
};

export function ImageColumns({ item }: Props) {
  const properties = PropertiesToModel<ImageColumnsPropertiesModel>(
    BlockTypes.ImageColumns,
    item.content,
  );

  if (!properties) {
    return null;
  }

  if (!properties.imageGrid?.items) {
    return null;
  }

  return (
    <Container className="py-10">
      <div
        className={cn(
          'grid gap-6 md:grid-flow-col',
          properties.imageGrid.items.length <= 2 && '[&>*]:aspect-16/10',
        )}
      >
        {properties.imageGrid.items.map((gridItem, index) => (
          <ColumnImage item={gridItem} key={index} />
        ))}
      </div>
      {properties.subtext?.markup && <RichText markup={properties.subtext.markup} />}
    </Container>
  );
}
