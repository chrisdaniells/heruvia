import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';

import { WikiApiClient } from '@api';

import config from '@config';

interface IResultsTrayProps {
    searchResults: any
}

interface IResultsTrayState {}

export default class ResultsTray extends React.Component<IResultsTrayProps, IResultsTrayState> {
    private WikiApiClient: WikiApiClient;

    constructor(props: IResultsTrayProps, state: IResultsTrayState) {
        super(props, state);

        this.WikiApiClient = new WikiApiClient();

        this.renderSourceResults = this.renderSourceResults.bind(this);
    }

    renderSourceResults() {
        let results: any[] = [];

        this.props.searchResults.forEach((source: any, index: number) => {
            console.log(source);

            let sourceResults: any[] = [];
            source.data.forEach((result: any, index: number) => {
                const requiresDivider: boolean = index < source.data.length-1;
                sourceResults.push(
                    <div
                        key={result.id}
                        style={{
                            borderBottom: requiresDivider ? '1px solid ' + config.styles.colours.line : 'none',
                            paddingBottom: requiresDivider ? config.styles.spacing.thin : 0,
                            marginBottom: requiresDivider ? config.styles.spacing.thin : 0,

                        }}
                    >
                        <Link
                            to={config.routes.wiki.page + result.url}
                            style={{
                                display: 'block',
                                color: config.styles.colours.text.default,
                                padding: config.styles.spacing.thin,
                            }}
                            className='u-hover-border'
                        >
                            <div style={{
                                display: 'inline-block',
                                float: 'left',
                                width: 80,
                                minHeight: 20,
                            }}>
                                {result.images.main.length > 0 &&
                                    <img 
                                        src={config.paths.images + result.images.main} 
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            paddingRight: config.styles.spacing.thin,
                                            borderRight: '1px solid ' + config.styles.colours.line,
                                        }}
                                    />
                                }
                            </div>
                            <div style={{
                                display: 'inline-block',
                                float: 'left',
                                width: 'calc(100% - 100px)',
                                paddingLeft: config.styles.spacing.thin,
                            }}>
                                <p style={{
                                    margin: 0,
                                    textDecoration: 'underline',
                                }}>{result.title}</p>
                                <p style={{
                                    fontSize: 12,
                                    margin: config.styles.spacing.thin + 'px 0 0',
                                }}>{this.WikiApiClient.getReducedPrefaceText(result.preface, 100)}</p>
                            </div>
                            <div style={{ clear: 'both' }} />
                        </Link>
                    </div>         
                )
            });

            const requiresDivider: boolean = index < this.props.searchResults.length-1;
            results.push(
                <Grid 
                    item
                    xs
                    key={source.name}
                >
                    <div style={{ 
                            maxWidth: 350,
                            borderRight: requiresDivider ? '1px solid ' + config.styles.colours.line : 'none',
                            float: 'right',
                        }}>
                        <Typography variant='button'>{source.name}</Typography>
                        {sourceResults}
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