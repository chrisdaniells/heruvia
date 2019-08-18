import { Categories, SubCategories } from '@enums';

export interface IPage {
    id: string;
    url: string;
    title: string;
    category: Categories;
    subcategory: SubCategories;
    images: {
        main: string;
        other: string[];
    };
    details: { [key: string] : string }[] | {};
    body: string;
    preface: string;
    date_created: number;
    last_updated: number;
    [key: string]: any;
}

export interface IPageTemplate {
    id: string;
    url: string;
    title: string;
    category: string;
    subcategory: string;
    images: {
        main: string;
        other: string[];
    };
    details: object;
    body: string;
    preface: string;
    date_created: number;
    last_updated: number;
}