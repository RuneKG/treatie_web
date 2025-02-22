import { Image } from '@/core/components/image';
import { Link } from '@/core/components/link';
import { PropertiesToModel } from '~/umbraco';
import { BlockComponentTypes } from '~/umbraco/constants/BlockTypes';
import { ApiBlockListModel, IconWithLinkPropertiesModel } from '~/umbracoClient';
import { umbracoImageUrl } from '~/util/utils';

import LinkIcon from '../../link-icons';

interface Props {
  links: ApiBlockListModel;
}

export const LogoLinks = ({ links: socialLinks }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {socialLinks.items.map((item, key) => {
        const socialMediaProps = PropertiesToModel<IconWithLinkPropertiesModel>(
          BlockComponentTypes.IconWithLink,
          item.content,
        );

        const link = socialMediaProps?.link?.[0];
        const logo = socialMediaProps?.icon?.[0];

        if (link) {
          return (
            <Link
              className="text-gray-500 hover:text-gray-900"
              href={link.url ?? ''}
              key={key}
              rel="noopener noreferrer"
              target="_blank"
            >
              {logo?.url ? (
                <Image
                  alt={logo.url}
                  className="object-contain"
                  height={48}
                  key={key}
                  src={umbracoImageUrl(logo.url)}
                  width={48}
                />
              ) : (
                <LinkIcon url={link.url ?? ''} />
              )}
            </Link>
          );
        }

        return null;
      })}
    </div>
  );
};
