import { ApiBlockGridItemModel, ApiBlockItemModel } from '../umbracoClient';

export interface BlockProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
  item: ApiBlockItemModel | ApiBlockGridItemModel;
}
