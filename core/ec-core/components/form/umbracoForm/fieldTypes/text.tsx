import { FormFieldDto } from '~/ec-core/formsClient';

export default function Text({ field }: { field: FormFieldDto }) {
  return <div>{field.caption}</div>;
}
