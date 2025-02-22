import { ImageWithLinkPropertiesModel } from "~/umbracoClient";

export function umbracoImageUrl(url: string) {
  // TODO: Change this to the actual URL of the Umbraco server
  return `http://localhost:22468${url}`;
}

export const getUmbracoImageWithLinkUrl = (
  image: ImageWithLinkPropertiesModel | null
) => {
  return umbracoImageUrl(image?.image?.at(0)?.url ?? "");
};

export const hasValue = (value: string | null | undefined) => {
  return value !== null && value !== undefined && value.trim() !== "";
};
