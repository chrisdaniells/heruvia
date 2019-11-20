import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import config from './config';

import { store, history } from '@store/store';

import WikiApp from '@apps/Wiki';
import WikiPage from '@apps/wiki/Page';
import WikiEdit from '@apps/Wiki/Edit';
import WikiListing from '@apps/Wiki/Listing';
import WikiPrint from '@apps/Wiki/Print';
import TimelineApp from '@apps/Timeline';

import AppControl from '@components/global/AppControl';
import Header from '@components/global/Header';


ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
                <Router>
                    <AppControl>
                        <Header />
                        <Switch>
                            <Route path={config.routes.timeline.root} component={TimelineApp} />

                            <Route
                                path={config.routes.wiki.list + '/:attribute/:value'}
                                component={WikiListing}
                            />
                            <Route 
                                path={config.routes.wiki.page + '/:id'}
                                component={WikiPage} 
                            />
                            <Route 
                                path={config.routes.wiki.edit + '/:id?'}
                                component={WikiEdit} 
                            />
                            <Route 
                                path={config.routes.wiki.print + '/:id'}
                                component={WikiPrint} 
                            />
                            <Route exact path={config.routes.wiki.root} component={WikiApp} />
                            <Route exact path='/' component={WikiApp} />
                            <Route component={WikiApp} />
                        </Switch>
                    </AppControl>
                </Router>
            </ThemeProvider>
        </ConnectedRouter>
    </Provider>
    
), document.getElementById('app'));