import { StaticImageData } from 'next/image';

import { Image } from '@/core/components/image';
import { GenericSlideshow } from '~/components/generic-slideshow';
import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { BlockComponentTypes } from '~/umbraco/constants/BlockTypes';
import { ImageColumnSlideshowPropertiesModel, ImageWithLinkPropertiesModel } from '~/umbracoClient';
import { umbracoImageUrl } from '~/util/utils';

interface Image {
  altText: string;
  blurDataUrl?: string;
  src: string | StaticImageData;
}

interface Props {
  className?: string;
  interval?: number;
}

const ImageColumnSlideshow = ({ className, interval = 15_000, item }: BlockProps & Props) => {
  const properties = PropertiesToModel<ImageColumnSlideshowPropertiesModel>(
    BlockTypes.ImageColumnSlideshow,
    item.content,
  );

  if (!properties) {
    return null;
  }

  const slides = properties.slideshowContent?.items
    .map((slide) =>
      PropertiesToModel<ImageWithLinkPropertiesModel>(
        BlockComponentTypes.ImageWithLink,
        slide.content,
      ),
    )
    .filter((slide) => slide !== null);

  if (!slides) {
    return null;
  }

  const slideContent = slides.map((slide, index) => {
    if (!slide.image?.[0]?.url) return null;

    return (
      <div
        className="relative mx-4 flex-1 py-10 pb-4 2xl:container md:mx-12 2xl:mx-auto 2xl:px-0"
        key={index}
      >
        <div className="relative aspect-5/2 w-auto md:flex-auto">
          <Image
            alt={slide.image[0]?.name ?? ''}
            className="object-cover"
            fill
            src={umbracoImageUrl(slide.image[0].url)}
          />
        </div>
      </div>
    );
  });

  return (
    <GenericSlideshow
      buttonWrapperClassname="relative md:mx-12 flex-1 py-10 pb-4 bottom-12 2xl:container 2xl:mx-auto 2xl:px-0"
      className={className}
      interval={interval}
      slides={slideContent}
    />
  );
};

export { ImageColumnSlideshow };
