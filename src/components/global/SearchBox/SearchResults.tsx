import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';

import config from '@config';

import { IEntry } from '@interfaces';

import PageList from '@components/wiki/PageList';

interface ISearchResultsProps {
    searchResults: any,
    drawerOnClose: any,
}

interface ISearchResultsState {}

export default class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsState> {

    constructor(props: ISearchResultsProps, state: ISearchResultsState) {
        super(props, state);

        this.renderSourceResults = this.renderSourceResults.bind(this);
    }

    renderTimelineList(data) {
        const results = [];
        data.forEach((entry: IEntry, key) => {
            results.push(
                <ListItem
                    key={key}
                    component={Link}
                    to={config.routes.timeline.root + '?scroll=' + entry.date.replace('/', '_')}
                    style={{
                        color: config.styles.colours.text.default
                    }}
                    onClick={this.props.drawerOnClose}
                >
                    <ListItemText
                        primary={entry.date}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    color='textPrimary'
                                >
                                    {entry.body.substring(0, 30) + '...'}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            );
        });
        return results;
    }

    renderSourceResults() {
        let results: any[] = [];

        this.props.searchResults.forEach((source: any) => {
            if (source.name === 'encyclopaedia') {
                results.push(
                    <Grid item xs key={source.name} >
                        <Typography variant='button'>{source.name}</Typography>
                        <PageList pages={source.data} prefaceLength={100} itemOnClick={this.props.drawerOnClose} />
                    </Grid>
                );
            } else if (source.name === 'timeline') {
                results.push(
                    <Grid item xs key={source.name} >
                        <Typography variant='button'>{source.name}</Typography>
                        <List>
                            {this.renderTimelineList(source.data)}
                        </List>
                    </Grid>
                );
            }
        });

        return results;
    }

    render() {
        return(
            <Grid container style={config.styles.container}>
                { this.renderSourceResults() }
            </Grid>
        )
    }
}