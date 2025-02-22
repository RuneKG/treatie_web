/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiBlockGridModel } from './ApiBlockGridModel';
import type { ApiBlockListModel } from './ApiBlockListModel';
export type SitePropertiesModel = {
    companyName?: string | null;
    address?: string | null;
    zipAndCity?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    vatNumber?: string | null;
    openingHours?: ApiBlockListModel;
    headerList?: ApiBlockGridModel;
    mainCategoryId?: string | null;
    socialMedia?: ApiBlockListModel;
    topBanners?: ApiBlockGridModel;
    uspBanners?: ApiBlockGridModel;
    contentFooter?: ApiBlockGridModel;
    informationFooter?: ApiBlockGridModel;
    paymentMethods?: ApiBlockListModel;
    deliveryMethods?: ApiBlockListModel;
};

