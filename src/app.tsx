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
                <Route path='/wiki/list/:attribute/:value' component={Wiki} />
                <Route 
                    path={['/', '/wiki', config.routes.wiki.page + '/:id']}
                    render={(props) => (
                        <Wiki
                            {...props}
                            WikiApiClient={wikiApiClient}
                            SearchApiClient={searchApiClient}
                        />
                     )} 
                />
                <Route component={Wiki} />
            </Switch>
        </Router>
    </ThemeProvider>
), document.getElementById('app'));