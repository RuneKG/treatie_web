import { FormsResource } from '~/ec-core/formsClient';
import { BlockProps } from '~/ec-core/types/blockProps';
import { BlockTypes, PropertiesToModel } from '~/ec-core/umbraco';
import { FormPropertiesModel } from '~/ec-core/umbracoClient';

import UmbracoForm from './umbracoForm';

export default async function Form({ item }: BlockProps) {
  const properties = PropertiesToModel<FormPropertiesModel>(BlockTypes.Form, item.content);

  if (!properties?.formSelector?.id) {
    return null;
  }

  try {
    const form = await FormsResource.getUmbracoFormsDeliveryApiV1Definitions({
      id: properties.formSelector.id,
    });

    return <UmbracoForm form={form} />;
  } catch (error) {
    console.error(error);
  }

  return <div>{properties.formSelector.id}</div>;
}
