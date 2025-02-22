/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  IApiContentResponseModel,
  type IApiElementModel,
} from '~/umbracoClient';

/*
 * This function is used to only return properties if the content type matches
 * from the response model.
 * Example:
 *    const properties = PropertiesToModel<MegaMenuPropertiesModel>('megaMenu', item.content);
 */
export function PropertiesToModel<T>(contentType: string, content?: IApiElementModel): T | null {
  if (!content) {
    return null;
  }

  if (contentType !== content.contentType) {
    return null;
  }

  const properties = content.properties as T;

  return properties;
}

/*
 * This function is used to filter out items that do not match the content type
 * from the response model.
 * Example:
 *    const items = ItemsToResponseModel<BannersContentResponseModel[]>('banners', banners.items);
 */
export function ItemToResponseModel<T>(
  contentType: string,
  item: IApiContentResponseModel,
): T | null {
  if (item.contentType !== contentType) {
    return null;
  }

  return item.properties as T;
}

/*
 * This function is used to filter out items that do not match the content type
 * from the response model.
 * Example:
 *    const items = ItemsToResponseModel<BannersContentResponseModel[]>('banners', banners.items);
 */
export function ItemsToResponseModel<T>(
  contentType: string,
  items: IApiContentResponseModel[],
): T | null {
  items.forEach((item) => {
    if (item.contentType !== contentType) {
      return null;
    }
  });

  return items as T;
}

/*
 * This function is used to filter out items that do not match the content type
 * from the response model.
 * Example:
 *    const items = ItemsToResponseModel<BannersContentResponseModel[]>('banners', banners.items);
 */
export function BlockToItemModel<T>(
  contentType: string,
  items?: Array<ApiBlockItemModel | ApiBlockGridItemModel>,
): T | null {
  if (!items) {
    return null;
  }

  items.forEach((item) => {
    if (item.content.contentType !== contentType) {
      return null;
    }
  });

  return items as T;
}
