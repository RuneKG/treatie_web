import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { ArticlesPanePropertiesModel } from '~/umbracoClient';
import { ApiBlockGridItemModel } from '~/umbracoClient/models/ApiBlockGridItemModel';

import { PaneLink } from './panelink';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  group: ApiBlockGridItemModel;
  navbarOnClick?: () => void;
}

const ArticlesPane = ({ group, navbarOnClick }: Props) => {
  const content = PropertiesToModel<ArticlesPanePropertiesModel>(
    BlockTypes.ArticlesPane,
    group.content,
  );

  if (!content) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 @4xl:block" key={group.content.id}>
      {content.articles?.map((article) => {
        return (
          <PaneLink
            key={article.id}
            navbarOnClick={navbarOnClick}
            path={article.route.path}
            title={article.name ?? ''}
          />
        );
      })}
    </div>
  );
};

ArticlesPane.displayName = 'ArticlesPane';

export { ArticlesPane };
