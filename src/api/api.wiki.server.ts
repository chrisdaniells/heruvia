const fs = (window as any).require('fs');
const path = (window as any).require('path');

import { ApiServer } from '@api';

import config from '@config';

import { IDefaultResponse } from './api.interfaces';
import { IPage } from '@interfaces';

class WikiApiServer extends ApiServer {

    private archiveFile(page: IPage) : boolean {
        const fileToArchive = config.paths.wikiarchive + page.id + '.json';

        let data = [];

        if (fs.existsSync(fileToArchive)) {
            const currentData = JSON.parse(fs.readFileSync(fileToArchive, 'utf8'));
            if (currentData) data = currentData;
        }

        data.push(page);

        fs.writeFileSync(fileToArchive, JSON.stringify(data));

        return fs.existsSync(fileToArchive);
    }

    public getAllPages() : IDefaultResponse {
        const pages = this.readDirectory(config.paths.wikipages);
    
        return this.generateDefaultResponse(pages && pages.length > 0, pages);
    }

    public getPagesByAttribute(attribute: string, value: string) : IDefaultResponse {
        if (!attribute || !value) return this.generateDefaultResponse(false);

        const files = this.readDirectory(config.paths.wikipages);
        const filteredFiles = files.filter(file => {
            if (file.hasOwnProperty(attribute)) return file[attribute] === value.toLowerCase();
            return false;
        });
        const status = filteredFiles.length > 0;

        return this.generateDefaultResponse(status, status ? filteredFiles : []);
    }

    public getPageById(id: string) : IDefaultResponse {
        if (!id) return this.generateDefaultResponse(false);

        const files = this.readDirectory(config.paths.wikipages);
        const file = files.find(file => { return id === file.id });
        const status = file !== undefined;
        
        return this.generateDefaultResponse(status, status ? file : {});
    }

    public updatePage(page: IPage, newPage: boolean): IDefaultResponse {
        if (!page) return this.generateDefaultResponse(false);

        if (page.id.length) {
            let file = page.id + '.json';

            if (fs.existsSync(config.paths.wikipages + file)) {
                this.archiveFile(page);
                this.deleteFile(file, config.paths.wikipages);
                if (fs.existsSync(config.paths.wikipages + file)) {
                    return this.generateDefaultResponse(false);
                }
            }
        } else {
            page.date_created = Date.now();
        }

        if (page.title.length === 0) return this.generateDefaultResponse(false);

        const newId = this.getPageIdFromTitle(page.title);
        page.id = newId,
        page.url = newId; 
        page.last_updated = Date.now();

        fs.writeFileSync(config.paths.wikipages + page.id + '.json', JSON.stringify(page));

        return this.generateDefaultResponse(true);
    }

    public deletePageById(id: string): IDefaultResponse {
        if (!id.length) return this.generateDefaultResponse(false);

        const pageRes = this.getPageById(id);
        if (pageRes.status) this.archiveFile(pageRes.data);

        const status = this.deleteFile(id + '.json', config.paths.wikipages);

        return this.generateDefaultResponse(status);
    }

    public getArchiveById(id: string) {
        if (!id) return this.generateDefaultResponse(false);

        const archiveFile = fs.readdirSync(config.paths.wikiarchive, {withFileTypes: true})
            .filter((file: any) => this.isJsonFile(file.name))
            .find(file => { 
                return this.isFileById(id, file.name);
            });

        const status = archiveFile !== undefined;

        const archive = status ? this.parseJsonFromFile(config.paths.wikiarchive + archiveFile.name) : [];

        return this.generateDefaultResponse(status, archive);
    }

    public uploadImages(images: string[]) : IDefaultResponse {
        if (images === undefined || images.length === 0) return this.generateDefaultResponse(false);

        let filenames: string[] = [];
        images.forEach(image => {
            const base = path.basename(image);
            const ext = path.extname(base);
            const filename = base + '-' + Date.now() + ext;
            filenames.push(filename);
            fs.copyFileSync(image, config.paths.images + filename);
        });

        const status: boolean = filenames.length > 0;
    
        return this.generateDefaultResponse(status, filenames);
    }

    public getPageIdFromTitle(title: string) {
        return title.trim().replace(/\s+/g, '_');
    }

    public getPageTitleFromId(id: string) {
        return id.trim().replace(/_/g, ' ');
    }

    public convertLegacy() {
        const pagesResponse = this.getAllPages();
        if (pagesResponse.status) {
            pagesResponse.data.forEach(page => {
                page.preface = page.preface.replace('<a href="#/view/', '<a href-"#/wiki/page');
                page.body = page.body.replace('<a href="#/view/', '<a href-"#/wiki/page');
                page.date_created = Date.parse(page.date_created);
                page.last_updated = Date.parse(page.last_updated);

                this.updatePage(page, false);
            });
        }
    }
}

export { WikiApiServer };