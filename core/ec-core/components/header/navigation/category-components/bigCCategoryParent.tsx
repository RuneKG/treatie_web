import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { CategoryLeaf } from '../../headerTypes';

import { BigCCategoryChildren } from './bigCCategoryChildren';
import { HeaderCategory } from './headerCategory';
import { SingleHeaderCategory } from './SingleHeaderCategory';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenu.Root> {
  link: CategoryLeaf;
  setOpen?: (value: boolean) => void;
  className?: string;
  contentClassname?: string;
}

// Every link in the header is a CategoryParent
export const BigCCategoryParent = ({ link, className, contentClassname }: Props) => {
  if (link.groups && link.groups.length > 0) {
    return (
      <HeaderCategory
        className={className}
        contentClassname={contentClassname}
        href={link.href}
        key={link.href}
        label={link.label}
      >
        <BigCCategoryChildren groups={link.groups} />
      </HeaderCategory>
    );
  }

  return (
    <SingleHeaderCategory
      className={className}
      contentHref={link.href}
      key={link.href}
      label={link.label}
    />
  );
};
