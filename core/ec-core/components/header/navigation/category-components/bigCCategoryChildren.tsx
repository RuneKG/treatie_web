'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { Link } from '@/core/components/link';

import { CategoryLeaf } from '../../headerTypes';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  groups: NonNullable<CategoryLeaf['groups']>;
  onClick?: () => void;
}

// Every link in the header is a CategoryParent
export const BigCCategoryChildren = ({ groups, onClick = () => {} }: Props) => {
  return (
    <>
      {groups.map((group) => (
        <ul className="flex flex-col" key={group.href}>
          <li>
            <NavigationMenuPrimitive.Link asChild>
              <Link className="block p-3 font-semibold" href={group.href} onClick={() => onClick()}>
                {group.label}
              </Link>
            </NavigationMenuPrimitive.Link>
          </li>
          {group.groups &&
            group.groups.length > 0 &&
            group.groups.map((nestedLink) => (
              <li key={nestedLink.href}>
                <NavigationMenuPrimitive.Link asChild>
                  <Link className="block p-3" href={nestedLink.href} onClick={() => onClick()}>
                    {nestedLink.label}
                  </Link>
                </NavigationMenuPrimitive.Link>
              </li>
            ))}
        </ul>
      ))}
    </>
  );
};
