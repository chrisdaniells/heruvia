import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import config from './config';

import { SearchApiClient, WikiApiClient, TimelineApiClient } from '@api';

import WikiApp from '@apps/Wiki';
import WikiPage from '@apps/wiki/Page';
import WikiEdit from '@apps/Wiki/Edit';
import WikiListing from '@apps/Wiki/Listing';
import WikiPrint from '@apps/Wiki/Print';
import TimelineApp from '@apps/Timeline';

import ScrollToTop from '@components/global/ScrollToTop';
import Header from '@components/global/Header';

const wikiApiClient = new WikiApiClient();
const searchApiClient = new SearchApiClient();
const timelineApiClient = new TimelineApiClient();

const AppProps = {
    WikiApiClient: wikiApiClient,
    SearchApiClient: searchApiClient,
    TimelineApiClient : timelineApiClient,
}

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <Router>
            <ScrollToTop>
                <Header 
                    WikiApiClient={wikiApiClient}
                    SearchApiClient={searchApiClient}
                />
                <Switch>
                    <Route
                        path={config.routes.timeline.root}
                        render={(props) => (<TimelineApp {...props} {...AppProps} />)}
                    />

                    <Route
                        path={config.routes.wiki.list + '/:attribute/:value'}
                        render={(props) => (<WikiListing {...props} {...AppProps} />)}
                    />
                    <Route 
                        path={config.routes.wiki.page + '/:id'}
                        render={(props) => (<WikiPage {...props} {...AppProps} />)} 
                    />
                    <Route 
                        path={config.routes.wiki.edit + '/:id?'}
                        render={(props) => (<WikiEdit {...props} {...AppProps} />)} 
                    />
                    <Route 
                        path={config.routes.wiki.print + '/:id'}
                        render={(props) => (<WikiPrint {...props} {...AppProps} />)} 
                    />
                    <Route 
                        exact 
                        path={config.routes.wiki.root}
                        render={(props) => (<WikiApp {...props} {...AppProps} />)} 
                    />
                    <Route
                        exact
                        path='/'
                        render={(props) => (<WikiApp  {...props} {...AppProps} />)}
                    />
                    <Route render={(props) => (<WikiApp {...props} {...AppProps} />)} />
                </Switch>
            </ScrollToTop>
        </Router>
    </ThemeProvider>
), document.getElementById('app'));