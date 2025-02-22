import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { ECFooter } from '~/ec-core/components/footer/ecFooter';
import { ECHeader } from '~/ec-core/components/header/header-wrapper';
import { ContentType, ContentTypes, ItemsToResponseModel } from '~/ec-core/umbraco';
import { ContentResource, OpenAPI, SiteContentResponseModel } from '~/ec-core/umbracoClient';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  OpenAPI.BASE = process.env.UMBRACO_URL ?? 'http://localhost:22468';

  const content = await ContentResource.getContent20({
    acceptLanguage: locale,
    filter: [`${ContentType}:${ContentTypes.site}`],
  });

  const items = ItemsToResponseModel<SiteContentResponseModel[]>(ContentTypes.site, content.items);

  if (!items) {
    return notFound();
  }

  const siteContent = items[0];

  if (!siteContent) {
    return notFound();
  }

  return (
    <>
      <ECHeader {...siteContent} />
      <main>{children}</main>
      <ECFooter {...siteContent} />
    </>
  );
}

export const experimental_ppr = true;
