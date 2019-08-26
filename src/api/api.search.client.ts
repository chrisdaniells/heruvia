import FuzzySearch from 'fuzzy-search';

import { DataSources } from '@enums';

export interface ISource {
    name: DataSources;
    files: any[];
    target: string;
    props: string[];
}

interface IResult {
    name: string;
    data: {
        [key: string]: any
    }
}

class SearchApiClient {
    private searchers: { [key: string] : FuzzySearch<any> } = {};

    public sources: ISource[] = [];

    private checkIfSourceExists(name: DataSources): boolean {
        return this.sources.some(source => source.name === name);
    }

    public setSource(name: DataSources, files: any[], target: string, props: string[]): boolean {
        if (this.checkIfSourceExists(name)) return false;

        files = this.reduceFiles(files, [...props, target ]);
        const sourceKey = this.sources.push({
            name, files, target, props,
        }) -1;

        this.searchers[name] = new FuzzySearch(this.sources[sourceKey].files, [target], {sort: true});
        
        return true;
    }

    reduceFiles(files: any[], props: string[]) {
        return files.map(file => {
            let reducedFile: { [key: string] : any } = {};
            props.forEach(prop => {
                reducedFile[prop] = file[prop];
            });
            return reducedFile;
        });
    }

    public refereshSource(name: DataSources, files: any[]): boolean {
        return this.sources.some((source: ISource, index: number) => {
            if (source.name === name) {
                files = this.reduceFiles(files, [...source.props, source.target]);
                this.sources[index].files = files;
                this.searchers[name] = new FuzzySearch(this.sources[index].files, [this.sources[index].target], {sort: true});
                return true;
            }
            return false;
        });
    }

    public deleteSource(name: DataSources): boolean {
        if (!this.checkIfSourceExists(name)) return true;

        this.sources = this.sources.filter(source => source.name !== name);
        delete this.searchers[name];

        if (this.checkIfSourceExists(name)) return false;
        return true;
    }

    public getSearchResults(value: string) {
        let results: IResult[] = [];

        // For Each Source
        for (const [name, searcher] of Object.entries(this.searchers)) {
            const data = searcher.search(value).slice(0,4);
            if (data.length > 0) {
                results.push({
                    name,
                    data, 
                });
            }
        }
        
        return [...results];
    }
}

export { SearchApiClient };