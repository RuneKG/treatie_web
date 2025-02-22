import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { JSX } from 'react';

import { SiteContentResponseModel } from '~/umbracoClient';

import { Footer as ComponentsFooter } from './footer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const socialIcons: Record<string, { icon: JSX.Element }> = {
  Facebook: { icon: <SiFacebook title="Facebook" /> },
  Twitter: { icon: <SiX title="Twitter" /> },
  X: { icon: <SiX title="X" /> },
  Pinterest: { icon: <SiPinterest title="Pinterest" /> },
  Instagram: { icon: <SiInstagram title="Instagram" /> },
  YouTube: { icon: <SiYoutube title="YouTube" /> },
};

export const ECFooter = (site: SiteContentResponseModel) => {
  if (!site.properties.informationFooter || !site.properties.contentFooter) {
    return null;
  }

  return (
    <ComponentsFooter
      cols={site.properties.contentFooter.gridColumns}
      contentSections={site.properties.contentFooter.items}
      informationSections={site.properties.informationFooter.items}
      properties={site.properties}
    />
  );
};
