/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiLinkModel } from './ApiLinkModel';
import type { IApiMediaWithCropsModel } from './IApiMediaWithCropsModel';
export type SlideshowContentPropertiesModel = {
    headline?: string | null;
    text?: string | null;
    link?: Array<ApiLinkModel> | null;
    image?: Array<IApiMediaWithCropsModel> | null;
    backgroundColor?: string | null;
    contentPlacement?: string | null;
};

