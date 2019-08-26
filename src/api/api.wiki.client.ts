import { WikiApiServer } from './api.wiki.server';

import { IDefaultResponse } from './api.interfaces';
import { ISource } from './api.search.client';
import { IPage } from '@interfaces';
import { DataSources } from '@enums';

import config from '@config';

class WikiApiClient {
    private WikiApiServer: WikiApiServer;

    private cacheTimeStamp: number;
    private cachedAllPagesResponse: IDefaultResponse;
    private cacheTime: number;

    constructor() {
        this.WikiApiServer = new WikiApiServer();

        this.cacheTimeStamp = 0;
        this.cacheTime = 5000
    }

    public getAllPages() : IDefaultResponse { 
        if (Date.now() - this.cacheTimeStamp > this.cacheTime || this.cachedAllPagesResponse === undefined) {
            this.cachedAllPagesResponse = this.WikiApiServer.getAllPages();
            this.cacheTimeStamp = Date.now();
        }
        return this.cachedAllPagesResponse;
    }
    
    public getPageById(id: string) : IDefaultResponse {
        return this.WikiApiServer.getPageById(id);
    }

    public getArchiveById(id: string) : IDefaultResponse {
        return this.WikiApiServer.getArchiveById(id);
    }

    public getPagesByAttribute(attribute: string, value: string) : IDefaultResponse {
        return this.WikiApiServer.getPagesByAttribute(attribute, value);
    }

    public deletePageById(id: string) : IDefaultResponse {
        return this.WikiApiServer.deletePageById(id);
    }

    public updatePage(data: IPage, newId: boolean) : IDefaultResponse {
        return this.WikiApiServer.updatePage(data, newId);
    }

    public restoreArchive(data: IPage): IDefaultResponse {
        data.last_updated = Date.now();
        return this.updatePage(data, false);
    }

    public uploadImages(images: string[]) : IDefaultResponse {
        return this.WikiApiServer.uploadImages(images);
    }

    public getSourceConfig() : ISource {
        const res = this.getAllPages();
        return {
            name: DataSources.Wiki,
            files: res.status ? res.data : [],
            target: 'title',
            props: ['id', 'url', 'title', 'preface', 'images'],
        }
    }

    static getReducedPrefaceText(preface: string, limit: number) {
        let text = '';
        const div = document.createElement('div');
        div.innerHTML = preface;
        const paragraphs = div.getElementsByTagName('p');
        for (let p of paragraphs) {
            const trimmed = p.innerText.trim();
            if (trimmed.length) {
                text = text + p.innerText + (trimmed[trimmed.length-1] !== '.' ? '.' : '') + ' ';
            }
        }
        text = text.substr(0,limit-1) + (text.length > limit ? '...' : '');
    
        return text;
    }

    public getPageTemplate(template?: string) : IPage {
        let PageTemplate = config.wiki.templates.base;

        if (template) {
            if (Object.keys(config.wiki.templates).some(t => t.toLowerCase() === template.toLowerCase())) {
                PageTemplate = config.wiki.templates[template];
            }
        }

        return { ...PageTemplate };
    }

    public getPageIdFromTitle(title: string) {
        return this.WikiApiServer.getPageIdFromTitle(title);
    }

    public getPageTitleFromId(id: string) {
        return this.WikiApiServer.getPageTitleFromId(id);
    }

    public validatePage(page: IPage): IDefaultResponse {
        let errors: string[] = [];

        if (page.title.length === 0) {
            errors.push('Please enter a page title.');
        } else {
            const existCheck = this.getPageById(this.getPageIdFromTitle(page.title));
            if (existCheck.status && page.id !== existCheck.data.id) {
                errors.push('A page with this title already exists.');
            } 
        } 
        if (page.category.length === 0) errors.push('Please select a page category.');
        if (page.subcategory.length === 0) errors.push('Please select a page subcategory.');
        if (page.body.length === 0) errors.push('Please enter a page body');

        return this.WikiApiServer.generateDefaultResponse(errors.length == 0, errors);
    }
}

export { WikiApiClient };