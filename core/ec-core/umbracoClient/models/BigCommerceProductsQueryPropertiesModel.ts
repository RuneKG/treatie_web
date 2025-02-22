/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiBlockListModel } from './ApiBlockListModel';
export type BigCommerceProductsQueryPropertiesModel = {
    searchTerm?: string | null;
    minimumPrice?: string | null;
    maximumPrice?: string | null;
    minimumRating?: string | null;
    maximumRating?: string | null;
    categoryIds?: Array<string> | null;
    searchSubCategories?: boolean | null;
    brandIds?: Array<string> | null;
    freeShipping?: boolean | null;
    featured?: boolean | null;
    hideOutOfStock?: boolean | null;
    sort?: string | null;
    productAttributes?: ApiBlockListModel;
};

