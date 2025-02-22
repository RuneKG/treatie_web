import { Slideshow as CoreSlideshow } from '@/vibes/soul/sections/slideshow';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { BlockComponentTypes } from '~/umbraco/constants/BlockTypes';
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  SlideshowPropertiesModel,
} from '~/umbracoClient';
import { SlideshowContentPropertiesModel } from '~/umbracoClient/models/SlideshowContentPropertiesModel';
import { umbracoImageUrl } from '~/util/utils';

// Copied from core slideshow
interface Slide {
  title: string;
  description?: string;
  showDescription?: boolean;
  image?: { alt: string; blurDataUrl?: string; src: string };
  cta?: {
    label: string;
    href: string;
    //   variant?: ButtonLinkProps['variant'];
    //   size?: ButtonLinkProps['size'];
    //   shape?: ButtonLinkProps['shape'];
  };
  showCta?: boolean;
}

interface Props {
  className?: string;
  interval?: number;
  item: ApiBlockItemModel | ApiBlockGridItemModel;
}

const UmbracoSlideshow = ({ className, interval = 15_000, item }: Props) => {
  const properties = PropertiesToModel<SlideshowPropertiesModel>(
    BlockTypes.Slideshow,
    item.content,
  );

  if (!properties) {
    return null;
  }

  const slides = properties.slideshows?.items
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
      showCta: false,
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

export { UmbracoSlideshow };
