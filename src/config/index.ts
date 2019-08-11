import path from 'path';

import categoriesConfig from './config.categories';

const config = {
    paths: {
        wikipages: path.normalize(path.resolve(__dirname, 'json/pages')) + "\\",
        wikiarchive: path.normalize(path.resolve(__dirname, 'json/archive/pages')) + "\\",
        languages: path.normalize(path.resolve(__dirname, 'json/languages')) + "\\",
        images: path.normalize(path.resolve(__dirname, 'images')) + "\\",
        thumbnails: path.normalize(path.resolve(__dirname, 'images/thumbnails')) + "\\"
    },
    categories: categoriesConfig,
}


export default config;