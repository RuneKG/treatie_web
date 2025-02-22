import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/ec-core/umbraco';
import { RichTextBlockPropertiesModel } from '~/ec-core/umbracoClient';

import Container from '../container';

import { RichText } from '.';

export function RichTextBlock({ item }: BlockProps) {
  const properties = PropertiesToModel<RichTextBlockPropertiesModel>(
    BlockTypes.RichText,
    item.content,
  );

  if (!properties?.richText?.markup) {
    return null;
  }

  return (
    <Container>
      <RichText markup={properties.richText.markup} />
    </Container>
  );
}
