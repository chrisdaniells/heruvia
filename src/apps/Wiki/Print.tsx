import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { Breadcrumbs, Grid } from '@material-ui/core';

import { IPage, IDetailsItem, IStoreState } from '@interfaces';

import config from '@config';

interface IPageProps {
    history: any;
    match: any;
    location: any;
    wiki: any;
    getPages?: any;
}

interface IPageState {}

@connect(
    (store: IStoreState) => {
        return {
            wiki: store.wiki,
        };
    }
)
export default class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps, state: IPageState) {
        super(props, state);
        this.renderDetails = this.renderDetails.bind(this);
    }

    componentDidMount() {
        document.getElementById('Header').style.display = 'none';
        document.documentElement.style.backgroundColor = 'white';
    }

    renderDetails(details: IDetailsItem[]) {
        const detailsItems: any[] = [];

        details.forEach((detail: any, index: number) => {
            const isFirst = (index === 0);
            const isLast = (details.length-1 === index);

            detailsItems.push(
                <Grid
                    container 
                    key={detail.label + detail.value}
                    style={{
                        borderBottom: !isLast ? '1px solid ' + config.styles.colours.line : 'none',
                        paddingBottom: !isLast ? config.styles.spacing.thin : 0,
                        paddingTop: !isFirst ? config.styles.spacing.thin : 0
                    }}
                >
                    <Grid item xs={6}>{detail.label}</Grid>
                    <Grid item xs={6}>{detail.value}</Grid>
                </Grid>
            );
        });

        return detailsItems;
    }

    render() {
        const page = this.props.wiki.pages.find((page: IPage) => page.id === this.props.match.params.id);

        if (page === undefined) return <div />;
        
        window.print();

        return (
            <div style={{ background: 'white', padding: 20 }}>
                {page !== null &&
                    <div id='Print' className='heruvia-text'>
                        <Breadcrumbs 
                            className='wikipage-breadcrumbs'
                            style={{ marginBottom: config.styles.spacing.default }}
                        >
                            <Link 
                                to={config.routes.wiki.list + '/category/' + page.category}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {page.category}
                            </Link>
                            <Link 
                                to={config.routes.wiki.list + '/subcategory/' + page.subcategory}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {page.subcategory}
                            </Link>
                        </Breadcrumbs>

                        <Grid
                            container
                            alignItems='flex-start'
                            style={{ marginBottom: config.styles.spacing.default }}
                        >
                            {page.preface.length > 0 &&
                                <Grid 
                                    item
                                    xs={page.details.length > 0 ? 7 : 12}
                                    className='wiki-preface heruvia-text'
                                    style={{ paddingRight: config.styles.spacing.default }}
                                >
                                    {ReactHtmlParser(page.preface)}
                                </Grid>
                            }
                            {page.details.length > 0 &&
                                <Grid 
                                    item 
                                    xs={5}
                                    className='wiki-details'
                                    style={{
                                        border: '1px solid ' + config.styles.colours.line,
                                        padding: config.styles.spacing.default
                                    }}
                                >
                                    {this.renderDetails(page.details)}
                                </Grid>
                            }
                        </Grid>
                        <div className='wiki-body heruvia-text'>{ReactHtmlParser(page.body)}</div>
                    </div>
                }
            </div>
        );
    }
}