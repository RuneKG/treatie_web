import { notFound } from 'next/navigation';

import BlockList from '~/components/block-list';
import { ContentType, ContentTypes } from '~/umbraco/constants/ContentTypes';
import { ItemsToResponseModel } from '~/umbraco/umbracoModelsHelper';
import { ContentResource, OpenAPI, PageContentResponseModel } from '~/umbracoClient';

interface Props {
  locale: string;
}

export default async function FrontpageBlocklist({ locale }: Props) {
  OpenAPI.BASE = process.env.UMBRACO_URL ?? 'http://localhost:22468';

  const content = await ContentResource.getContent20({
    acceptLanguage: locale,
    filter: [`${ContentType}:${ContentTypes.frontPage}`],
  });

  const items = ItemsToResponseModel<PageContentResponseModel[]>(
    ContentTypes.frontPage,
    content.items,
  );

  if (!items) {
    return notFound();
  }

  const frontPageGridList = items[0]?.properties.content?.items;

  if (!frontPageGridList) {
    return notFound();
  }

  return <BlockList gridList={frontPageGridList} />;
}

export const runtime = 'edge';
