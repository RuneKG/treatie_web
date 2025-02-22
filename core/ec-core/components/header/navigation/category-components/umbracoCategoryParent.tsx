import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { MegaMenuPropertiesModel } from '~/umbracoClient';

import { CategoryTree } from '../../headerTypes';

import { HeaderCategory } from './headerCategory';
import { SingleHeaderCategory } from './SingleHeaderCategory';
import { UmbracoCategoryChild } from './umbracoCategoryChild';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenu.Root> {
  link: MegaMenuPropertiesModel;
  categoryTree: CategoryTree;
  className?: string;
  contentClassname?: string;
}

// Every link in the header is a CategoryParent
const UmbracoCategoryParent = ({ link, categoryTree, className, contentClassname }: Props) => {
  const bigCommerceCategory = categoryTree.find(
    (BigCommerceCategory) => BigCommerceCategory.entityId === link.bigCCategoryId,
  );

  const contentHref = bigCommerceCategory?.href ?? '';

  if (link.headerList && link.headerList.items.length > 0) {
    return (
      <HeaderCategory
        className={className}
        contentClassname={contentClassname}
        href={contentHref}
        key={link.bigCCategoryId}
        label={link.tabName ?? ''}
      >
        {/** Subcategories, if applicable */}
        {link.headerList.items.map((group) => (
          <UmbracoCategoryChild
            bigCommerceCategory={bigCommerceCategory}
            group={group}
            key={group.content.id}
          />
        ))}
      </HeaderCategory>
    );
  }

  return (
    <SingleHeaderCategory
      className={className}
      contentHref={contentHref}
      key={link.bigCCategoryId}
      label={link.tabName}
    />
  );
};

UmbracoCategoryParent.displayName = 'UmbracoCategoryChild';

export { UmbracoCategoryParent };
