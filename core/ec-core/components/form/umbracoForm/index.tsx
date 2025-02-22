import { FieldConditionActionType, FormDto, FormFieldDto } from '~/ec-core/formsClient';
import { HasValue } from '~/ec-core/util/extensions';

import { FieldComponents } from './fieldTypes/FieldComponents';

export default function UmbracoForm({ form }: { form: FormDto }) {
  function RenderField({ field }: { field: FormFieldDto }) {
    const Component = FieldComponents[field.type.name];

    if (!Component) {
      return <p key={field.id}>{field.type.name}</p>;
    }

    return <Component field={field} key={field.id} />;
  }

  return (
    <div className="" id={form.id}>
      {HasValue(form.name) && <h4 className="">{form.name}</h4>}
      {true /* ValidationSummary */}
      {form.pages.map((page) =>
        page.fieldsets.map((fieldset) => (
          <fieldset
            className={
              fieldset.condition?.actionType === FieldConditionActionType.HIDE
                ? 'hidden'
                : 'flex flex-col gap-2'
            }
            key={fieldset.id}
          >
            {HasValue(fieldset.caption) && <legend>{fieldset.caption}</legend>}
            <div className="flex flex-col gap-2">
              {fieldset.columns.map((container) => (
                <div className="flex flex-col gap-2" key={container.width}>
                  {container.fields.map((field) => (
                    <div
                      className={
                        field.condition?.actionType === FieldConditionActionType.HIDE
                          ? 'hidden'
                          : 'flex flex-col gap-2'
                      }
                      key={field.id}
                    >
                      {HasValue(field.caption) && <label>{field.caption}</label>}
                      {RenderField({ field })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </fieldset>
        )),
      )}
    </div>
  );
}
