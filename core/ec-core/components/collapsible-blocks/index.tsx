"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { PropertiesToModel } from "~/umbraco";
import { BlockComponentTypes } from "~/umbraco/constants/BlockTypes";
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  CollapsibleBlockPropertiesModel,
  CollapsibleBlocksPropertiesModel,
} from "~/umbracoClient";

import Container from "../container";
import { RichText } from "../richtext";

interface Props {
  item: ApiBlockItemModel | ApiBlockGridItemModel;
}

export default function CollapsibleBlocks({ item }: Props) {
  const properties = PropertiesToModel<CollapsibleBlocksPropertiesModel>(
    "collapsibleBlocks",
    item.content
  );

  if (!properties) {
    return null;
  }

  const items = properties.blocks?.items;

  return (
    <Container>
      {items?.map((block, index) => <Block block={block} key={index} />)}
    </Container>
  );
}

function Block({
  block,
}: {
  block: ApiBlockItemModel | ApiBlockGridItemModel;
}) {
  const blockProperties = PropertiesToModel<CollapsibleBlockPropertiesModel>(
    BlockComponentTypes.CollapsibleBlock,
    block.content
  );
  const [shown, setShown] = useState(false);

  if (!blockProperties) {
    return null;
  }

  if (!blockProperties.text) {
    return <div className="border-b py-10">{blockProperties.headline}</div>;
  }

  return (
    <div>
      <button
        className="mb-4 flex w-full justify-between border-b py-10"
        onClick={() => setShown(!shown)}
      >
        {blockProperties.headline}
        {shown ? <ChevronUp /> : <ChevronDown />}
      </button>
      {shown && <RichText markup={blockProperties.text.markup} />}
    </div>
  );
}
