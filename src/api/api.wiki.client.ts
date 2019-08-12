import { WikiApiServer } from './api.wiki.server';

import { IDefaultResponse } from './api.interfaces';
import { ISource } from './api.search.client';
import { IPage } from '@interfaces';
import { DataSources } from '@enums';

class WikiApiClient {
    private WikiApiServer: WikiApiServer;

    constructor() {
        this.WikiApiServer = new WikiApiServer();
    }

    public getAllPages() : IDefaultResponse {
        return this.WikiApiServer.getAllPages();
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
            target: "title",
            props: ["id", "url", "title", "preface", "images"],
        }
    }
}

export { WikiApiClient };