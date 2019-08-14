import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import config from './config';

import { SearchApiClient, WikiApiClient } from '@api';

import Wiki from '@apps/Wiki';
import Languages from '@apps/Languages';
import Timeline from '@apps/Timeline';

import Header from '@components/global/Header';

const wikiApiClient = new WikiApiClient();
const searchApiClient = new SearchApiClient();

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <Router>
        <Header 
            WikiApiClient={wikiApiClient}
            SearchApiClient={searchApiClient}
        />
            <Switch>
                <Route path='/timeline' component={Timeline} />
                <Route path='/languages' component={Languages} />
                <Route path={config.routes.wiki.page + '/:id'} component={Wiki} />
                <Route 
                    path='/wiki'
                    render={() => (
                        <Wiki
                            WikiApiClient={wikiApiClient}
                            SearchApiClient={searchApiClient}
                        />
                     )} 
                />
                <Route path='/' component={Wiki} />
                <Route component={Wiki} />
            </Switch>
        </Router>
    </ThemeProvider>
), document.getElementById('app'));