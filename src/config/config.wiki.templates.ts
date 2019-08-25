import { IPage } from '@interfaces';
import { Categories, SubCategories } from '@enums';

const base: IPage = {
    id: '',
    url: '',
    title: '',
    category: '',
    subcategory: '',
    images: {
        main: '',
        other: [],
    },
    details: [],
    body: '',
    preface: '',
    date_created: 0,
    last_updated: 0,
}

const biography: IPage = {
    id: '',
    url: '',
    title: '',
    category: Categories.Anthropology,
    subcategory: SubCategories.Biographies,
    images: {
        main: '',
        other: [],
    },
    details: [
        {
            label: 'Date of Birth',
            value: '',
            link: false,
        },
        {
            label: 'Place of Birth',
            value: '',
            link: true,
        }
    ],
    body: '',
    preface: '',
    date_created: 0,
    last_updated: 0,
}

export default {
    'base': base ,
    'biography': biography,
};