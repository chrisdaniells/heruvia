import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { WikiApiClient } from '@api';

import {
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    List,
    ListItem,
} from '@material-ui/core';
import {
    ArrowBack as BackIcon,
    Edit as EditIcon,
    Home as HomeIcon,
} from '@material-ui/icons';

import Alert, { IAlertProps } from '@components/global/Alert';
import CreatePageButton from '@components/wiki/CreatePageButton';
import ImageGallery from '@components/global/ImageGallery';
import { sanitizeLink } from '@components/global/QuillEditor';

import { IPage } from '@interfaces';

import config from '@config';

interface IPageProps {
    WikiApiClient: WikiApiClient;
    history: any;
    match: any;
    location: any;
}

interface IPageState {
    page: IPage | null;
}

export default class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps, state: IPageState) {
        super(props, state);

        this.fetchPage = this.fetchPage.bind(this);
        this.renderDetails = this.renderDetails.bind(this);

        this.state = {
            page: null,
        }
    }

    componentDidMount() {
        this.fetchPage();
        document.getElementById('Header').style.display = "none";
    }

    componentDidUpdate(prevProps: IPageProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.fetchPage();
        }
    }

    fetchPage() {
        if (!this.props.match.params.id) return;

        const pageResponse = this.props.WikiApiClient.getPageById(this.props.match.params.id);
        if (pageResponse.status) {
            this.setState({ 
                page: pageResponse.data,
            });
        }
    }

    renderDetails() {
        const details: any[] = [];

        this.state.page.details.forEach((detail: any, index: number) => {
            const isFirst = (index === 0);
            const isLast = (this.state.page.details.length-1 === index);

            details.push(
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

        return details;
    }

    render() {
        window.print();

        const page = this.state.page;

        return (
            <div style={{
                background: 'white',
                padding: 20,
            }}>
                {page !== null &&
                    <div id='Print' className='heruvia-text'>
                        <Breadcrumbs 
                            className='wikipage-breadcrumbs'
                            style={{
                                marginBottom: config.styles.spacing.default
                            }}
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
                            style={{
                                marginBottom: config.styles.spacing.default
                            }}
                        >
                            {page.preface.length > 0 &&
                                <Grid 
                                    item
                                    xs={page.details.length > 0 ? 7 : 12}
                                    className='wiki-preface heruvia-text'
                                    style={{
                                        paddingRight: config.styles.spacing.default
                                    }}
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
                                    {this.renderDetails()}
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