import { Categories, SubCategories } from '@enums';
import { IDetailsItem } from '@interfaces';


export interface IPage {
    id: string;
    url: string;
    title: string;
    category: Categories | string;
    subcategory: SubCategories | string;
    images: {
        main: string;
        other: string[];
    };
    details: IDetailsItem[];
    body: string;
    preface: string;
    date_created: string;
    last_updated: string;
    [key: string]: any;
}

export interface IDetailsItem {
    label: string;
    value: string;
}