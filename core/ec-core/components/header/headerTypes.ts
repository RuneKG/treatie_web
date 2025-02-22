export interface Image {
  src: string;
  altText: string;
}

export interface CategoryLeaf {
  entityId: number;
  label: string;
  href: string;
  groups?: Array<{
    entityId: number;
    label: string;
    href: string;
    groups?: Array<{
      entityId: number;
      label: string;
      href: string;
    }>;
  }>;
}

export type CategoryTree = CategoryLeaf[];
