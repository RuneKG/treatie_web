import { Image } from '@/core/components/image';
import { ItemToResponseModel } from '~/umbraco/umbracoModelsHelper';
import { ArticlePropertiesModel, ContentResource, IApiContentModel } from '~/umbracoClient';
import { umbracoImageUrl } from '~/util/utils';

interface Props {
  article: IApiContentModel;
}

export default async function ArticleCard({ article }: Props) {
  const content = await ContentResource.getContentItemById20({
    id: article.id,
  });

  const articleProperties = ItemToResponseModel<ArticlePropertiesModel>('article', content);

  if (!articleProperties) {
    return null;
  }

  return (
    <a className="flex flex-col justify-end gap-2 overflow-hidden" href={article.route.path}>
      {articleProperties.backgroundImages && (
        <div className="flex justify-between gap-2">
          {articleProperties.backgroundImages
            .filter((image) => image.url)
            .slice(0, 2)
            .map((image, index) => (
              <Image
                alt={image.name}
                className="max-h-56 w-fit rounded-xl"
                height={400}
                key={index}
                src={umbracoImageUrl(image.url)}
                width={400}
              />
            ))}
        </div>
      )}
      <div className="font-light">{articleProperties.headline}</div>
      <div className="h-32 text-sm font-light">{articleProperties.teaser}</div>
    </a>
  );
}
