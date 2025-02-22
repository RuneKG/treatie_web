import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { BlockTypes } from '~/umbraco/constants/BlockTypes';
import { ApiBlockGridItemModel } from '~/umbracoClient';

import { CategoryLeaf } from '../../headerTypes';
import { ArticlesPane } from '../../panes/articlesPane';
import { CategoryPane } from '../../panes/categoryPane';
import { ContentPane } from '../../panes/contentPane';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  group: ApiBlockGridItemModel;
  bigCommerceCategory?: CategoryLeaf;
  colStart?: number;
  colSpan?: number;
  // We add OnClick to props in case we need to handle a common click event on all children (Like closing the navbar)
  navbarOnClick?: () => void;
}

// Every sub category in the header is a CategoryChild
const UmbracoCategoryChild = ({ group, bigCommerceCategory, navbarOnClick }: Props) => {
  const contentType = group.content.contentType;

  // Handle the different types of groups here.
  switch (contentType) {
    case BlockTypes.CategoryPane:
      return (
        <CategoryPane
          bigCommerceCategory={bigCommerceCategory}
          group={group}
          key={group.content.id}
          navbarOnClick={navbarOnClick}
        />
      );

    case BlockTypes.ArticlesPane:
      return <ArticlesPane group={group} key={group.content.id} navbarOnClick={navbarOnClick} />;

    case BlockTypes.ContentPane:
      return <ContentPane group={group} key={group.content.id} navbarOnClick={navbarOnClick} />;

    default:
  }
};

UmbracoCategoryChild.displayName = 'UmbracoCategoryChild';

export { UmbracoCategoryChild };
