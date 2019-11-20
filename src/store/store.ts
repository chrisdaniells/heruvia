import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import wikiReducer from '@store/reducers/wikiReducer';
import timelineReducer from '@store/reducers/timelineReducer';

const history = createBrowserHistory();

const store = createStore(
    combineReducers({
        router: connectRouter(history),
        timeline: timelineReducer,
        wiki: wikiReducer,
    }),
    compose(
        applyMiddleware(
            routerMiddleware(history),
        ),
    ),
);

export { history, store };