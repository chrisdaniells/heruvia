const fs = (window as any).require('fs');
const path = (window as any).require('path');

import { ApiServer } from '@api';

import config from '@config';

import { IDefaultResponse } from './api.interfaces';
import { IPage } from '@interfaces';

class WikiApiServer extends ApiServer {
    private archiveFile(page: IPage) : boolean {
        const fileToArchive = config.paths.wikiarchive + page.url + '.json';

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

    public updatePageById(id: string, data: IPage) : IDefaultResponse {
        if (!id || !data) return this.generateDefaultResponse(false);

        let file = config.paths.wikipages + id + '.json';

        if (fs.existsSync(file)) {
            this.deleteFile(file, config.paths.wikipages);
            if (fs.existsSync(file)) return;
        }

        if (data.title !== id) file = config.paths.wikipages + data.url + '.json';

        fs.writeFileSync(file, JSON.stringify(data));

        this.archiveFile(data);
    }

    public deletePageById(id: string): IDefaultResponse {
        if (!id.length) return this.generateDefaultResponse(false);

        const status = this.deleteFile(id + '.json', config.paths.wikipages);

        return this.generateDefaultResponse(status);
    }

    public getArchiveById(id: string) {
        if (!id) return this.generateDefaultResponse(false);

        const files = this.readDirectory(config.paths.wikiarchive).filter(file => {
            this.isJsonFile(config.paths.wikiarchive + file.name);
        });

        const archive = files.find(file => { 
            return this.isFileById(id, file.name);
        });

        const status = archive !== undefined;

        return this.generateDefaultResponse(status, status ? archive : [] )
    }

    public uploadImages(images: string[]) : IDefaultResponse {
        if (!images || images.length) return this.generateDefaultResponse(false);

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
}

export { WikiApiServer };