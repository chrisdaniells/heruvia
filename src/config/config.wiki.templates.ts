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

const fauna: IPage = {
    id: '',
    url: '',
    title: '',
    category: Categories.Ecology,
    subcategory: SubCategories.Fauna,
    images: {
        main: '',
        other: [],
    },
    details: [
        {
            label: 'Animal Kingdom',
            value: '',
            link: false,
        },
        {
            label: 'Animal Order',
            value: '',
            link: false,
        },
    ],
    body: '<h1>Etymology</h1><p></p><h1>Taxonomy and phylogeny</h1><p></p><h1>Characteristics</h1><p></p><h2>Size</h2><p></p><h2>Head</h2><p></p><h2>Body</h2><p></p><h2>Limbs</h2><p></p><h2>Feet</h2><p></p><h2>Other</h2><p></p><h1>Behaviour</h1><h2>Habitat</h2><p></p><h2>Social Organisation</h2><p></p><h2>Diet</h2><p></p><h2>Assication With Humans</h2><p></p>',
    preface: '',
    date_created: 0,
    last_updated: 0,
}

export default {
    'base': base ,
    'biography': biography,
    'fauna': fauna,
};