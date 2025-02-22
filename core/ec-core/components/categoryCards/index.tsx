import clsx from 'clsx';

import { getSessionCustomerAccessToken } from '@/core/auth';
import { client } from '@/core/client';
import { graphql } from '@/core/client/graphql';
import { revalidate } from '@/core/client/revalidate-target';
import { Image } from '@/core/components/image';
import { Link } from '@/core/components/link';
import { cn } from '@/core/lib/utils';
import { SectionLayout } from '@/vibes/soul/sections/section-layout';
import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { CategoryCardsPropertiesModel } from '~/umbracoClient';

interface Props {
  className?: string;
  colorScheme?: 'light' | 'dark';
  imageSize?: 'square' | 'tall' | 'wide';
}

const CategoryTree = graphql(`
  query CategoryTree3LevelsDeep {
    site {
      categoryTree {
        ...CategoryFields
        children {
          ...CategoryFields
        }
      }
    }
  }

  fragment CategoryFields on CategoryTreeItem {
    name
    description
    path
    entityId
    image {
      url: urlTemplate(lossy: true)
      altText
    }
  }
`);

export const CategoryCards = async ({
  className,
  item,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageSize = 'square',
  colorScheme = 'light',
  ...props
}: Props & BlockProps) => {
  const categoryProperties = PropertiesToModel<CategoryCardsPropertiesModel>(
    BlockTypes.CategoryCards,
    item.content,
  );

  if (!categoryProperties) {
    return null;
  }

  const customerAccessToken = await getSessionCustomerAccessToken();

  const { data } = await client.fetch({
    document: CategoryTree,
    customerAccessToken,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const categories = data.site.categoryTree.slice(0, 6);

  return (
    <SectionLayout>
      <div className="mb-16 flex flex-col gap-6">
        <h2 className="text-center text-xl font-bold md:text-5xl">{categoryProperties.headline}</h2>
        <div className="text-center text-lg leading-6">{categoryProperties.description}</div>
      </div>
      <div className="grid grid-cols-2 gap-10 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            className={cn(className, 'flex flex-col justify-end')}
            key={category.entityId}
            {...props}
          >
            {!category.children.length ? (
              <Link
                className={clsx(
                  'relative flex aspect-5/6 h-full justify-center overflow-hidden rounded-[var(--product-card-border-radius,1rem)]',

                  {
                    light: 'bg-[var(--product-card-light-background,hsl(var(--contrast-100)))]',
                    dark: 'bg-[var(--product-card-dark-background,hsl(var(--contrast-500)))]',
                  }[colorScheme],
                )}
                href={category.path}
              >
                {category.image ? (
                  <div className="relative aspect-square flex-auto overflow-hidden">
                    <Image
                      alt={category.image.altText}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
                      src={category.image.url}
                    />
                  </div>
                ) : (
                  <div
                    className={clsx(
                      'w-full break-words pl-5 pt-5 text-start text-4xl font-bold leading-[0.8] tracking-tighter opacity-25 transition-transform duration-500 ease-out group-hover:scale-105 @xs:text-7xl',
                      {
                        light: 'text-[var(--product-card-light-title,hsl(var(--foreground)))]',
                        dark: 'text-[var(--product-card-dark-title,hsl(var(--background)))]',
                      }[colorScheme],
                    )}
                  >
                    {category.name}
                  </div>
                )}
              </Link>
            ) : (
              <div
                className={`grid grid-cols-2 md:grid-cols-${category.children.length > 2 ? category.children.length / 2 : category.children.length} gap-2`}
              >
                {category.children.map((subCategory) => (
                  <Link className="p-2" href={subCategory.path} key={subCategory.entityId}>
                    <div className="relative flex aspect-video justify-center p-2 text-sm">
                      {subCategory.image && (
                        <Image
                          alt={subCategory.image.altText}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
                          src={subCategory.image.url}
                        />
                      )}
                    </div>
                    {subCategory.name}
                  </Link>
                ))}
              </div>
            )}
            <div className={cn('mb-2 flex flex-col gap-1')}>
              <h3 className="text-lg lg:text-xl">
                <Link
                  className="focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary/20 focus-visible:ring-0"
                  href={category.path}
                >
                  {category.name}
                </Link>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};
