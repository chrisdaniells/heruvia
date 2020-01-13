import path from 'path';

import categoriesConfig from './config.wiki.categories';
import stylesConfig from './config.styles';
import templatesConfig from './config.wiki.templates';
import alertConfig from './config.alert';
import entryConfig from './config.timeline.entry';

const config: { [key: string] : any } = {
    paths: {
        wikipages: path.normalize(path.resolve(__dirname, 'json/wiki/pages')) + '\\',
        wikiarchive: path.normalize(path.resolve(__dirname, 'json/wiki/archive/pages')) + '\\',
        timeline: path.normalize(path.resolve(__dirname, 'json/timeline'))  + '\\',
        timelineArchive: path.normalize(path.resolve(__dirname, 'json/timeline/archive')) + '\\',
        images: path.normalize(path.resolve(__dirname, 'images')) + '\\',
        thumbnails: path.normalize(path.resolve(__dirname, 'images/thumbnails')) + '\\'
    },
    routes: {
        wiki: {
            root: '/wiki',
            page: '/wiki/page',
            edit: '/wiki/edit',
            list: '/wiki/list',
            print: '/wiki/print',
        },
        timeline: {
            root: '/timeline',
            scroll: '/timeline?scroll=',
        },
    },
    wiki: {
        categories: categoriesConfig,
        templates: templatesConfig,
    },
    timeline: {
        entry: entryConfig,
    },
    styles: stylesConfig,
    alert: alertConfig,
}

export default config;