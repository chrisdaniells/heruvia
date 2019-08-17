import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';

import { WikiApiClient } from '@api';

import config from '@config';

import PageList from '@components/wiki/PageList';

interface IResultsTrayProps {
    searchResults: any
}

interface IResultsTrayState {}

export default class ResultsTray extends React.Component<IResultsTrayProps, IResultsTrayState> {

    constructor(props: IResultsTrayProps, state: IResultsTrayState) {
        super(props, state);

        this.renderSourceResults = this.renderSourceResults.bind(this);
    }

    renderSourceResults() {
        let results: any[] = [];

        this.props.searchResults.forEach((source: any, index: number) => {

            results.push(
                <Grid 
                    item
                    xs
                    key={source.name}
                >
                    <div style={{ 
                            maxWidth: 350,
                            float: 'right',
                        }}>
                        <Typography variant='button'>{source.name}</Typography>
                            {<PageList 
                                pages={source.data}
                                prefaceLength={100}
                            />}
                    </div>
                </Grid>
            )
        });

        return results;
    }

    render() {
        return(
            <Grid 
                container 
                style={config.styles.container}
            >
                { this.renderSourceResults() }
            </Grid>
        )
    }
}