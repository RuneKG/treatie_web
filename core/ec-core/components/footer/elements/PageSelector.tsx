import { Link } from '@/core/components/link';
import { PropertiesToModel } from '~/umbraco';
import { ApiBlockGridItemModel, PageSelectorPropertiesModel } from '~/umbracoClient';

interface Props {
  item: ApiBlockGridItemModel;
}

export const PageSelector = ({ item }: Props) => {
  const pageSelectorProps = PropertiesToModel<PageSelectorPropertiesModel>(
    'pageSelector',
    item.content,
  );

  if (!pageSelectorProps?.pages) {
    return null;
  }

  return (
    <nav>
      <ul>
        {pageSelectorProps.pages.map((page, index) => {
          return (
            <li key={page.name}>
              <Link href={page.route.path} key={index}>
                {page.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
