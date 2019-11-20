import { IStoreTimelineState, IDefaultAction } from '@interfaces';
import { StoreTimelineActions } from '@enums';

const initialState: IStoreTimelineState = {
    entries: [],
};

export default (state: IStoreTimelineState = initialState, action: IDefaultAction): IStoreTimelineState => {
    if (typeof action !== null) {
        switch (action.type) {
            case StoreTimelineActions.getTimeline:
                return {
                    ...state,
                    entries: action.payload,
                };
            default: 
                return state;
        }
    }
}