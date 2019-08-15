import path from 'path';

import categoriesConfig from './config.categories';
import stylesConfig from './config.styles';

const config: { [key: string] : any } = {
    paths: {
        wikipages: path.normalize(path.resolve(__dirname, 'json/pages')) + '\\',
        wikiarchive: path.normalize(path.resolve(__dirname, 'json/archive/pages')) + '\\',
        languages: path.normalize(path.resolve(__dirname, 'json/languages')) + '\\',
        images: path.normalize(path.resolve(__dirname, 'images')) + '\\',
        thumbnails: path.normalize(path.resolve(__dirname, 'images/thumbnails')) + '\\'
    },
    routes: {
        wiki: {
            page: '/wiki/page',
        }
    },
    categories: categoriesConfig,
    styles: stylesConfig,
}


export default config;