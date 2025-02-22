import React from 'react';

import { FormFieldDto } from '~/ec-core/formsClient';

import Text from './text';

export const FieldComponents: Record<string, React.ComponentType<{ field: FormFieldDto }>> = {
  text: Text,
};
