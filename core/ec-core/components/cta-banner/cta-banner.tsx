import { Slideshow as CoreSlideshow, Slide } from '@/vibes/soul/sections/slideshow';
import { cn } from '~/lib/utils';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { BlockComponentTypes } from '~/umbraco/constants/BlockTypes';
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  CtaBannerPropertiesModel,
} from '~/umbracoClient';
import { SlideshowContentPropertiesModel } from '~/umbracoClient/models/SlideshowContentPropertiesModel';
import { umbracoImageUrl } from '~/util/utils';

interface Props {
  className?: string;
  interval?: number;
  item: ApiBlockItemModel | ApiBlockGridItemModel;
}

const CTABanner = ({ className, interval = 15_000, item }: Props) => {
  const properties = PropertiesToModel<CtaBannerPropertiesModel>(
    BlockTypes.CTABanner,
    item.content,
  );

  if (!properties) {
    return null;
  }

  const slides = properties.banners?.items
    .map((slide) =>
      PropertiesToModel<SlideshowContentPropertiesModel>(
        BlockComponentTypes.SlideshowContent,
        slide.content,
      ),
    )
    .filter((slide) => slide !== null);

  if (!slides) {
    return null;
  }

  const slideContent: Slide[] = slides.map((slide) => {
    return {
      title: slide.headline ?? '',
      description: slide.text ?? '',
      showDescription: true,
      image: slide.image
        ? { alt: slide.image[0]?.name ?? '', src: umbracoImageUrl(slide.image[0]?.url ?? '') }
        : undefined,
      showCta: !!slide.link?.[0]?.title,
      cta: {
        label: slide.link?.[0]?.title ?? '',
        href: slide.link?.[0]?.url ?? '',
      },
    };
  });

  return (
    <CoreSlideshow
      className="!h-50vh min-h-[30rem] select-none"
      interval={interval}
      slides={slideContent}
    />
  );
};

export { CTABanner };
