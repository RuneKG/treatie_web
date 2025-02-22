import { PropertiesToModel } from '~/umbraco';
import {
  ApiBlockGridItemModel,
  ApiBlockItemModel,
  DictonaryItemPropertiesModel,
} from '~/umbracoClient';

interface Props {
  items: Array<ApiBlockItemModel | ApiBlockGridItemModel>;
}

export const DictionaryItems = ({ items }: Props) => {
  const props = items
    .map((item) => PropertiesToModel<DictonaryItemPropertiesModel>('dictonaryItem', item.content))
    .filter((x) => x);

  return (
    <div className="flex flex-col gap-1">
      {props.map((item) => (
        <div className="grid grid-cols-2" key={item?.valueString}>
          <span>{item?.keyString}</span>
          <span>{item?.valueString}</span>
        </div>
      ))}
    </div>
  );
};
