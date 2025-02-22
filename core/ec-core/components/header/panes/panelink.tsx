'use client';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentPropsWithoutRef } from 'react';

import { Link as CustomLink } from '@/core/components/link';

interface Props extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  title: string;
  path: string;
  navbarOnClick?: () => void;
}

const PaneLink = ({ title, path, navbarOnClick = () => {} }: Props) => {
  return (
    <ul>
      <li>
        <NavigationMenuPrimitive.Link asChild>
          <CustomLink
            className="block w-fit p-3 font-semibold"
            href={path}
            onClick={() => navbarOnClick()}
          >
            {title}
          </CustomLink>
        </NavigationMenuPrimitive.Link>
      </li>
    </ul>
  );
};

PaneLink.displayName = 'PaneLink';

export { PaneLink };
