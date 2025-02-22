import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { BlockTypes, PropertiesToModel } from '~/umbraco';
import { SubCategoryPropertiesModel } from '~/umbracoClient';
import { ApiBlockGridItemModel } from '~/umbracoClient/models/ApiBlockGridItemModel';
import { CategoryPanePropertiesModel } from '~/umbracoClient/models/CategoryPanePropertiesModel';

import { CategoryLeaf } from '../headerTypes';
import { BigCCategoryChildren } from '../navigation/category-components/bigCCategoryChildren';

import { PaneLink } from './panelink';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  group: ApiBlockGridItemModel;
  bigCommerceCategory?: CategoryLeaf;
  navbarOnClick?: () => void;
}

const CategoryPane = ({ group, bigCommerceCategory, navbarOnClick }: Props) => {
  // If the group is a category pane without a bigCommerceCategory, it is setup incorrectly
  if (!bigCommerceCategory) {
    return null;
  }

  const content = PropertiesToModel<CategoryPanePropertiesModel>(
    BlockTypes.CategoryPane,
    group.content,
  );

  if (!content) {
    return null;
  }

  if (!bigCommerceCategory.groups) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 @4xl:block" key={group.content.id}>
      {content.subCategories?.items.length && content.subCategories.items.length > 0 ? (
        content.subCategories.items.map((groupContent) => {
          const subCategory = PropertiesToModel<SubCategoryPropertiesModel>(
            'subCategory',
            groupContent.content,
          );

          if (!subCategory || !subCategory.bigCCategoryId || !subCategory.title) {
            return null;
          }

          const childContent = bigCommerceCategory.groups?.find(
            (child) => child.entityId === subCategory.bigCCategoryId,
          );

          if (!childContent) {
            return null;
          }

          return (
            <PaneLink
              key={groupContent.content.id}
              navbarOnClick={navbarOnClick}
              path={childContent.href}
              title={subCategory.title}
            />
          );
        })
      ) : (
        <BigCCategoryChildren groups={bigCommerceCategory.groups} />
      )}
    </div>
  );
};

CategoryPane.displayName = 'CategoryPane';

export { CategoryPane };
