import { ReactNode } from 'react';

import { cn } from '@/core/lib/utils';
import { ContentTypes } from '~/umbraco';
import {
  ApiBlockGridItemModel,
  GenericFooterPropertiesModel,
  SitePropertiesModel,
} from '~/umbracoClient';
import { hasValue } from '~/util/utils';

import { ContactInformation } from './elements/ContactInformation';
import { DictionaryItems } from './elements/DictonaryItems';
import { LogoLinks } from './elements/LogoLinks';
import { PageSelector } from './elements/PageSelector';

interface Props {
  className?: string;
  properties?: SitePropertiesModel;
  contentSections: ApiBlockGridItemModel[];
  informationSections: ApiBlockGridItemModel[];
  cols: number;
}

const FooterElement = ({
  generic,
  children,
}: {
  generic: GenericFooterPropertiesModel | undefined;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {hasValue(generic?.headline) && <span className="text-xl">{generic?.headline}</span>}
      {children}
    </div>
  );
};

const Footer = ({
  className,
  properties,
  contentSections,
  informationSections,
  cols,
  ...props
}: Props) => {
  const RenderFooterElement = (item: ApiBlockGridItemModel, key: number) => {
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    // All types inherit from GenericFooterPropertiesModel
    switch (item.content.contentType) {
      case ContentTypes.pageSelector:
        return (
          <FooterElement
            generic={item.content.properties as GenericFooterPropertiesModel}
            key={key}
          >
            <PageSelector item={item} />
          </FooterElement>
        );

      case ContentTypes.socialMedia:
        return (
          <FooterElement
            generic={item.content.properties as GenericFooterPropertiesModel}
            key={key}
          >
            {properties?.socialMedia ? <LogoLinks links={properties.socialMedia} /> : null}
          </FooterElement>
        );

      case ContentTypes.deliveryMethods:
        return (
          <FooterElement
            generic={item.content.properties as GenericFooterPropertiesModel}
            key={key}
          >
            {properties?.deliveryMethods ? <LogoLinks links={properties.deliveryMethods} /> : null}
          </FooterElement>
        );

      case ContentTypes.paymentMethods:
        return (
          <FooterElement
            generic={item.content.properties as GenericFooterPropertiesModel}
            key={key}
          >
            {properties?.paymentMethods ? <LogoLinks links={properties.paymentMethods} /> : null}
          </FooterElement>
        );

      case ContentTypes.contactInformation:
        return properties ? (
          <FooterElement
            generic={item.content.properties as GenericFooterPropertiesModel}
            key={key}
          >
            <ContactInformation global={properties} />
          </FooterElement>
        ) : null;

      case ContentTypes.openingHours:
        return properties?.openingHours?.items ? (
          <FooterElement
            generic={item.content.properties as GenericFooterPropertiesModel}
            key={key}
          >
            <DictionaryItems items={properties.openingHours.items} />
          </FooterElement>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <footer className={cn('', className)} {...props}>
      <section
        className="grid gap-8 border-t border-gray-200 px-4 py-10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {contentSections.map((item, key) => {
          return RenderFooterElement(item, key);
        })}
      </section>
      <section
        className="grid gap-8 border-t border-gray-200 px-4 py-10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {informationSections.map((item, key) => {
          return RenderFooterElement(item, key);
        })}
      </section>
    </footer>
  );
};

Footer.displayName = 'Footer';

export { Footer };
