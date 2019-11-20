import { IStoreWikiState, IDefaultAction } from '@interfaces';
import { StoreWikiActions } from '@enums';

const initialState: IStoreWikiState = {
    pages: [],
};

export default (state: IStoreWikiState = initialState, action: IDefaultAction): IStoreWikiState => {
    if (typeof action !== null) {
        switch (action.type) {
            case StoreWikiActions.getPages:
                return {
                    ...state,
                    pages: action.payload,
                };
            default: 
                return state;
        }
    }
}