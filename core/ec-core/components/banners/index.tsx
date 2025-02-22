import { getLocale } from "next-intl/server";

import { ContentType, ContentTypes } from "~/umbraco/constants/ContentTypes";
import { ItemsToResponseModel } from "~/umbraco/umbracoModelsHelper";
import { BannersContentResponseModel, ContentResource } from "~/umbracoClient";

import { Banner } from "./banner";

interface Props {
  bannerProperty: "uspHeader" | "topBanner";
}

export const Banners = async ({ bannerProperty }: Props) => {
  const locale = await getLocale();

  const banners = await ContentResource.getContent20({
    acceptLanguage: locale,
    filter: [`${ContentType}:${ContentTypes.banners}`],
  });

  if (banners.total === 0) {
    return null;
  }

  const items = ItemsToResponseModel<BannersContentResponseModel[]>(
    "banners",
    banners.items
  );

  if (!items) {
    return null;
  }

  const banner = items[0]?.properties[bannerProperty];

  if (!banner) {
    return null;
  }

  const isUsp = bannerProperty === "uspHeader";

  return (
    <div
      className={`grid md:grid-cols-${banner.gridColumns} ${isUsp ? "" : "gap-x-4"} gap-y-2 py-${isUsp ? 0 : 2}`}
    >
      {banner.items.map((item, key) => (
        <Banner banner={item} isUsp={isUsp} key={key} />
      ))}
    </div>
  );
};
