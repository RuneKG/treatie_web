/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiBlockListModel } from './ApiBlockListModel';
import type { ApiLinkModel } from './ApiLinkModel';
import type { IApiMediaWithCropsModel } from './IApiMediaWithCropsModel';
export type ArticlePropertiesModel = {
    content?: ApiBlockListModel;
    backgroundImages?: Array<IApiMediaWithCropsModel> | null;
    headline?: string | null;
    teaser?: string | null;
    link?: Array<ApiLinkModel> | null;
};

