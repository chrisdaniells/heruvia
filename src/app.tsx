import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';

import Wiki from '@apps/Wiki';
import Languages from '@apps/Languages';
import Header from '@components/Header';

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <Router>
        <   Header />
            <Switch>
                <Route path='/languages' component={Languages} />
                <Route path='/wiki' component={Wiki} />
                <Route path='/' component={Wiki} />
                <Route component={Wiki} />
            </Switch>
        </Router>
    </ThemeProvider>
), document.getElementById('app'));