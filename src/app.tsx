import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import config from './config';

import { SearchApiClient, WikiApiClient } from '@api';

import WikiApp from '@apps/Wiki';
import WikiPage from '@apps/wiki/Page';
import WikiEdit from '@apps/Wiki/Edit';
import WikiListing from '@apps/Wiki/Listing';
import WikiPrint from '@apps/Wiki/Print';
import LanguagesApp from '@apps/Languages';
import NotesApp from '@apps/Notes';
import TimelineApp from '@apps/Timeline';

import ScrollToTop from '@components/global/ScrollToTop';
import Header from '@components/global/Header';

const wikiApiClient = new WikiApiClient();
const searchApiClient = new SearchApiClient();

const WikiAppProps = {
    WikiApiClient: wikiApiClient,
    SearchApiClient: searchApiClient,
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
                    <Route path='/notes' component={NotesApp} />
                    <Route path='/timeline' component={TimelineApp} />
                    <Route path='/languages' component={LanguagesApp} />

                    <Route
                        path='/wiki/list/:attribute/:value'
                        render={(props) => (<WikiListing {...props} {...WikiAppProps} />)}
                    />
                    <Route 
                        path={config.routes.wiki.page + '/:id'}
                        render={(props) => (<WikiPage {...props} {...WikiAppProps} />)} 
                    />
                    <Route 
                        path={config.routes.wiki.edit + '/:id?'}
                        render={(props) => (<WikiEdit {...props} {...WikiAppProps} />)} 
                    />
                    <Route 
                        path={config.routes.wiki.print + '/:id'}
                        render={(props) => (<WikiPrint {...props} {...WikiAppProps} />)} 
                    />
                    <Route 
                        exact 
                        path={config.routes.wiki.root}
                        render={(props) => (<WikiApp {...props} {...WikiAppProps} />)} 
                    />
                    <Route
                        exact
                        path='/'
                        render={(props) => (<WikiApp  {...props} {...WikiAppProps} />)}
                    />
                    <Route render={(props) => (<WikiApp {...props} {...WikiAppProps} />)} />
                </Switch>
            </ScrollToTop>
        </Router>
    </ThemeProvider>
), document.getElementById('app'));