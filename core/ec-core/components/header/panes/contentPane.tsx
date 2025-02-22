'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { MoveRight } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

import { Image } from '@/core/components/image';
import { Link } from '@/core/components/link';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { BlockComponentTypes } from '~/umbraco/constants/BlockTypes';
import { ContentPanePropertiesModel, ImageWithLinkPropertiesModel } from '~/umbracoClient';
import { ApiBlockGridItemModel } from '~/umbracoClient/models/ApiBlockGridItemModel';
import { getUmbracoImageWithLinkUrl } from '~/util/utils';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  group: ApiBlockGridItemModel;
  navbarOnClick?: () => void;
}

const ContentPane = ({ group, navbarOnClick = () => {} }: Props) => {
  const content = PropertiesToModel<ContentPanePropertiesModel>(
    BlockTypes.ContentPane,
    group.content,
  );

  if (!content) {
    return null;
  }

  const largeImage = PropertiesToModel<ImageWithLinkPropertiesModel>(
    BlockComponentTypes.ImageWithLink,
    content.largeImage?.items[0]?.content,
  );
  const topSmallImage = PropertiesToModel<ImageWithLinkPropertiesModel>(
    BlockComponentTypes.ImageWithLink,
    content.bottomSmallImage?.items[0]?.content,
  );
  const bottomSmallImage = PropertiesToModel<ImageWithLinkPropertiesModel>(
    BlockComponentTypes.ImageWithLink,
    content.topSmallImage?.items[0]?.content,
  );

  const handleGenericOnClick = (path: string | null | undefined) => {
    if (path && path !== '') {
      navbarOnClick();
    }
  };

  return (
    <div className="col-span-2 flex h-full flex-col gap-5">
      <div className="flex items-end justify-center self-stretch px-2 pt-3 lg:px-0">
        <div className="text-secondary shrink grow font-bold lg:text-2xl">{content.headline}</div>
        {content.link?.[0]?.route?.path && (
          <Link
            className="text-secondary flex items-center justify-center gap-2.5 text-sm font-semibold"
            href={content.link[0].route.path}
            onClick={() => handleGenericOnClick(content.link?.[0]?.route?.path)}
          >
            {content.link[0].title}
            <div className="relative h-6 w-6">
              <MoveRight className="text-secondary" />
            </div>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 items-center gap-6 self-stretch">
        <div className="flex h-full shrink grow flex-col items-start justify-center">
          <Link
            className="bg-bg-xLight relative flex shrink grow items-center self-stretch"
            href={largeImage?.link?.[0]?.url ?? ''}
            onClick={() => handleGenericOnClick(largeImage?.link?.[0]?.url)}
          >
            <Image
              alt=""
              className="absolute object-cover"
              fill
              src={getUmbracoImageWithLinkUrl(largeImage)}
            />
          </Link>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-center gap-6">
          {[topSmallImage, bottomSmallImage].map((image, index) => (
            <div className="self-stretch" key={index}>
              <Link
                className="bg-bg-xLight relative flex h-36 shrink grow items-center"
                href={image?.link?.[0]?.url ?? ''}
                onClick={() => handleGenericOnClick(image?.link?.[0]?.url)}
              >
                <Image
                  alt=""
                  className="absolute object-cover"
                  fill
                  src={getUmbracoImageWithLinkUrl(image)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ContentPane.displayName = 'ContentPane';

export { ContentPane };
