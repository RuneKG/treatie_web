import React from 'react';

import { ApiBlockGridItemModel, ApiBlockItemModel } from '~/umbracoClient';

import { BlockComponents } from './BlockComponents';

interface Props {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
  gridList: Array<ApiBlockItemModel | ApiBlockGridItemModel>;
}

export default function BlockList({ searchParams, gridList }: Props) {
  return (
    <div className="flex flex-col space-y-12 pb-10">
      {gridList.map((item: ApiBlockItemModel | ApiBlockGridItemModel, key: number) => {
        const Component = BlockComponents[item.content.contentType];

        if (!Component) {
          return <p key={key}>{item.content.contentType}</p>;
        }

        return <Component item={item} key={key} searchParams={searchParams} />;
      })}
    </div>
  );
}
