import { WikiApiServer } from './api.wiki.server';

import { IDefaultResponse } from './api.interfaces';
import { ISource } from './api.search.client';
import { IPage } from '@interfaces';
import { DataSources } from '@enums';

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
        if (Date.now() - this.cacheTimeStamp > this.cacheTime) {
            this.cachedAllPagesResponse = this.WikiApiServer.getAllPages();
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
}

export { WikiApiClient };