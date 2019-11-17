const fs = (window as any).require('fs');
const path = (window as any).require('path');

import { ApiServer } from '@api';

import config from '@config';

import { IDefaultResponse } from '@interfaces';
import { IEntry } from '@interfaces';

class TimelineApiClient extends ApiServer {

    private archive(events: IEntry[]): void {
        fs.writeFileSync(config.paths.timelineArchive + Date.now() + '.json', JSON.stringify(events));
    }

    public getTimeline() : IDefaultResponse {
        const file: IEntry[] = [ ...this.parseJsonFromFile(config.paths.timeline + 'timeline.json') ];
        const status = file !== undefined;
        
        return this.generateDefaultResponse(status, status ? file : {});
    }

    public updateTimeline(newEntry: IEntry): IDefaultResponse {
        const file: IEntry[] = this.parseJsonFromFile(config.paths.timeline + 'timeline.json');
        this.archive(file);

        let exists = false;

        const updated = file.map((entry: IEntry) => {
            if (entry.id === newEntry.id) {
                exists = true;
                return newEntry;
            } else {
                return entry;
            }
        });

        if (!exists) {
            updated.push(newEntry);
        }

        this.deleteFile('timeline.json', config.paths.timeline);
        fs.writeFileSync(config.paths.timeline + 'timeline.json', JSON.stringify(updated));

        return this.generateDefaultResponse(true);
    }

    public deleteEntry(id: number): void {
        const file = this.getTimeline().data;
        const updated = file.filter((entry: IEntry) => entry.id !== id);
        
        this.deleteFile('timeline.json', config.paths.timeline);
        fs.writeFileSync(config.paths.timeline + 'timeline.json', JSON.stringify(updated));
    }
}

export { TimelineApiClient };