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
    details: object[];
    body: string;
    preface: string;
    date_created: string;
    date_last_updated: string;
}