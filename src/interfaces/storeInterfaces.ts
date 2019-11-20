import { IPage, IEntry } from '@interfaces';

export interface IStoreState {
    wiki: IStoreWikiState;
    timeline: IStoreTimelineState;
    search: any;
}

export interface IStoreWikiState {
    pages: IPage[];
};

export interface IStoreTimelineState {
    entries: IEntry[];
};

export interface IDefaultAction {
    type: string;
    payload?: any;
}