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
        this.cacheTime = 10000
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

    public getPagesByAttribute(attribute: string, value: string) : IDefaultResponse {
        return this.WikiApiServer.getPagesByAttribute(attribute, value);
    }

    public deletePageById(id: string) : IDefaultResponse {
        return this.WikiApiServer.deletePageById(id);
    }

    public updatePageById(id: string, data: IPage) : IDefaultResponse {
        return this.WikiApiServer.updatePageById(id, data);
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

    public getPageTemplate() : IPage {
        const PageTemplate: IPage = {
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
            last_updated: 0
        }

        return PageTemplate;
    }

    public getPageIdFromTitle(title: string) {
        return title.trim().replace(/\s+/g, '_');
    }

    public sanitizeQuillLink(url: string) {
        if (url[0] == '#') { 
            url = url.replace('#', '');
            url = url.replace(config.routes.wiki.page + '/', '');
            url = '#' + config.routes.wiki.page + '/' + url.trim().replace(/\s+/g, '_');
        };
        return url;
    }
}

export { WikiApiClient };