import { notFound } from 'next/navigation';

import BlockList from '~/components/block-list';
import { Image } from '~/components/image';
import { ArticleContentModel } from '~/umbracoClient';

import { umbracoImageUrl } from '../util/utils';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ locale: string }>;
  page: ArticleContentModel;
}

export function ArticlePage({ page, searchParams }: Props) {
  if (!page.properties) {
    return notFound();
  }

  const frontPageGridList = page.properties.content?.items;

  const links = page.properties.link;

  const foregroundImages = page.properties.backgroundImages?.slice(0, 2);

  const backgroundImages = page.properties.backgroundImages?.slice(2);

  return (
    <div>
      <div className="my-6 flex flex-col items-center gap-2.5 md:my-24">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="font-bod leading-22 text-center text-7xl">
              {page.properties.headline}
            </div>
            <div className="text-center text-lg leading-7">{page.properties.teaser}</div>
          </div>
          {links?.[0]?.url && (
            <div className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg bg-[#04050e] px-6 py-2.5">
              <a
                className="text-sm font-semibold leading-[14px] tracking-wide text-white"
                href={links[0].url}
              >
                {links[0].title}
              </a>
            </div>
          )}
        </div>
        <div className="relative h-full w-full">
          {backgroundImages && (
            <div className="absolute -z-10 flex w-full justify-between">
              {backgroundImages
                .filter((image) => image.url)
                .map((image, index) => (
                  <Image
                    alt={image.name}
                    className="w-1/4 rounded-xl xl:w-1/6"
                    height={460}
                    key={index}
                    src={umbracoImageUrl(image.url)}
                    width={340}
                  />
                ))}
            </div>
          )}
          {foregroundImages && (
            <div className="mx-auto w-1/2 px-10">
              <div className="mt-16 flex w-full justify-center gap-10">
                {foregroundImages
                  .filter((image) => image.url)
                  .map((image, index) => (
                    <Image
                      alt={image.name}
                      className="w-full rounded-xl"
                      height={667}
                      key={index}
                      src={umbracoImageUrl(image.url)}
                      width={440}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {frontPageGridList && <BlockList gridList={frontPageGridList} searchParams={searchParams} />}
    </div>
  );
}
