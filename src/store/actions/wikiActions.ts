import _ from '@lib/herulib';
import config from '@config';

import { IDefaultAction, IPage } from '@interfaces';
import { StoreWikiActions } from '@enums';

export function getPages(): IDefaultAction {
    return {
        type: StoreWikiActions.getPages,
        payload: _.file.getFiles(config.paths.wikipages),
    }
}

export function savePage(page: IPage): boolean {
    if (!page.id.length) {
        page.date_created = Date.now();
    }

    const newId = this.getPageIdFromTitle(page.title);
    page.id = newId,
    page.url = newId; 
    page.last_updated = Date.now();

    return _.file.saveFile(JSON.stringify(page), config.paths.wikipages + page.id + '.json');
}

export function deletePageById(id: string): boolean {
    const filepath = config.paths.wikipages + id + 'json';
    return _.file.deleteFile(filepath);
}

export function getArchiveById(id: string) {
    const filepath = config.paths.wikiarchive + id + 'json';
    return _.file.getFileJson(filepath);
}