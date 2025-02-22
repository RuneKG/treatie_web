import { SitePropertiesModel } from '~/ec-core/umbracoClient';

interface Props {
  global: SitePropertiesModel;
}

export const ContactInformation = ({ global }: Props) => {
  return (
    <div className="flex flex-col">
      <span>{global.companyName}</span>
      <span>{global.address}</span>
      <span>{global.zipAndCity}</span>
      <span>{global.phoneNumber}</span>
      <span>{global.email}</span>
      <span>{global.vatNumber}</span>
    </div>
  );
};
