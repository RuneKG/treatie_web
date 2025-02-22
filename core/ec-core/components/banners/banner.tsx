"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";

import { PropertiesToModel } from "~/umbraco/umbracoModelsHelper";
import { ApiBlockGridItemModel, BannerPropertiesModel } from "~/umbracoClient";

interface Props {
  banner: ApiBlockGridItemModel;
  isUsp: boolean;
}

export const Banner = ({ banner, isUsp }: Props) => {
  const properties = PropertiesToModel<BannerPropertiesModel>(
    "banner",
    banner.content
  );
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (properties === null) {
    return null;
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`relative flex justify-center p-4 text-sm col-span-${banner.columnSpan} row-span-${banner.rowSpan} ${isUsp ? "" : "rounded-lg"}`}
      style={{
        ...(properties.backgroundColor
          ? { backgroundColor: properties.backgroundColor }
          : {}),
      }}
    >
      {properties.link ? (
        <a
          href={properties.link[0]?.url ?? ""}
          target={properties.link[0]?.target ?? ""}
        >
          {properties.message ?? properties.link[0]?.title}
        </a>
      ) : (
        <span>{properties.message}</span>
      )}
      {properties.removable && (
        <button className="absolute right-4" onClick={toggleOpen}>
          <XIcon />
        </button>
      )}
    </div>
  );
};
