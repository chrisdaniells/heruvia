import path from 'path';

import categoriesConfig from './config.wiki.categories';
import stylesConfig from './config.styles';
import templatesConfig from './config.wiki.templates';

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
            root: '/wiki',
            page: '/wiki/page',
            edit: '/wiki/edit',
            list: '/wiki/list',
        },
        language: {
            page: '/language',
        },
        timeline: {
            page: '/timeline',
        },
        todo: {
            page: '/todo',
        },
    },
    wiki: {
        categories: categoriesConfig,
        templates: templatesConfig,
    },
    styles: stylesConfig,
}

export default config;