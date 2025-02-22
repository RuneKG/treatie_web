import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { OpenAPI as OpenAPIForms } from '~/ec-core/formsClient';
import { ContentTypes } from '~/ec-core/umbraco';
import { ArticleContentModel, ContentResource, OpenAPI } from '~/ec-core/umbracoClient';
import { ArticlePage } from '~/ec-core/umbracoPages';

interface Props {
  params: Promise<{ locale: string; rest: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatchAllPage(props: Props) {
  const { locale, rest } = await props.params;

  setRequestLocale(locale);

  OpenAPI.BASE = process.env.UMBRACO_URL ?? 'http://localhost:22468';
  OpenAPIForms.BASE = process.env.UMBRACO_URL ?? 'http://localhost:22468';

  try {
    const umbracoPage = await ContentResource.getContentItemByPath20({
      acceptLanguage: locale,
      path: rest.join('/'),
    });

    if (umbracoPage.contentType === ContentTypes.article) {
      // eslint check above

      return (
        <ArticlePage
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          page={umbracoPage as ArticleContentModel}
          params={props.params}
          searchParams={props.searchParams}
        />
      );
    }
  } catch {
    notFound();
  }
}
