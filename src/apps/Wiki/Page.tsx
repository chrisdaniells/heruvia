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
    archive: any | null;
    alert: IAlertProps
}

export default class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps, state: IPageState) {
        super(props, state);

        let alert: IAlertProps = { open: false, title: '', message: '', close: false, confirm: false };

        this.fetchPage = this.fetchPage.bind(this);
        this.renderDetails = this.renderDetails.bind(this);
        this.renderArchivedVersions = this.renderArchivedVersions.bind(this);
        this.restoreArchive = this.restoreArchive.bind(this);
        this.resetAlert = this.resetAlert.bind(this);

        this.state = {
            page: null,
            archive: null,
            alert,
        }
    }

    componentDidMount() {
        this.fetchPage();
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
                archive: null,
            });
        } else {
            const archiveResponse = this.props.WikiApiClient.getArchiveById(this.props.match.params.id);
            if (archiveResponse.status) {
                this.setState({
                    archive: archiveResponse.data,
                    page: null,
                });
            } else {
                this.setState({
                    archive: null,
                    page: null,
                })
            }
        }
    }

    restoreArchive(archive: IPage) {
        const restoreResponse = this.props.WikiApiClient.restoreArchive(archive);
        if (restoreResponse.status) {
            this.fetchPage();
        } else {
            this.setState({
                alert: {
                    open: true,
                    title: 'Error',
                    message: 'The archived page could not be restored.',
                    close: {
                        onClose: this.resetAlert,
                        label: "OK",
                    },
                    confirm: false,
                }
            });
        }
    }

    resetAlert(): void {
        this.setState (state => ({
            alert: { ...state.alert, open: false }
        }),() => {
            // Otherwise text disappears before dialog closes
            setTimeout(() => {
                this.setState(state => ({
                    alert: {
                        ...state.alert,
                        title: '',
                        message: '',
                        close: false,
                        confirm: false,
                    }
                }));
            }, 100);
        });
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

    renderArchivedVersions() {
        if (this.state.archive === null) return;

        const archived: any[] = [];
        
        this.state.archive.forEach(archive => {
            const timestamp = new Date(archive.last_updated);
            archived.push(
                <ListItem button key={archive.last_updated}>
                    <Grid container>
                        <Grid
                            item
                            xs={10}
                            style={{
                                lineHeight: '25px'
                            }}
                        >{'Last Updated: ' + timestamp}</Grid>
                        <Grid item xs={2}>
                            <Button
                                variant='outlined'
                                onClick={(e) => { this.restoreArchive(archive) }}
                            >Restore</Button>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        });

        return <List>{archived}</List>;
    }

    render() {
        const page = this.state.page;

        return (
            <div style={{ ...config.styles.container, marginTop: 100 }}>
                <Card square style={{ marginBottom: config.styles.spacing.default }}>
                    <CardHeader
                        action={
                            <div>
                                <IconButton onClick={this.props.history.goBack}><BackIcon /></IconButton>
                                {page !== null &&
                                    <IconButton 
                                        component={Link}
                                        to={config.routes.wiki.edit + '/' + page.id}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                }
                                <IconButton component={Link} to={config.routes.wiki.root}><HomeIcon /></IconButton>
                            </div>
                        }
                        title={page !== null ? page.title : ''}
                        className="Wiki_Page_Title"
                    />
                    <CardContent style={{ padding: config.styles.spacing.default }}>
                        {page === null &&
                            <div>
                            <p
                                style={{
                                    marginBottom: config.styles.spacing.default
                                }}
                            >The page {this.props.WikiApiClient.getPageTitleFromId(this.props.match.params.id)} has not been found. Would you like to create it now?</p>
                            <div>
                                <CreatePageButton query={{ create: this.props.match.params.id }}/>
                            </div>

                                {this.state.archive !== null &&
                                    <div style={{
                                        border: '1px solid ' + config.styles.colours.line,
                                        padding: config.styles.spacing.default,
                                        marginTop: 60
                                    }}>
                                        <div>This page has the following archived versions:</div>
                                        {this.renderArchivedVersions()}
                                    </div>
                                }
                            </div>
                        }
                        {page !== null &&
                            <div id='Page' className='heruvia-text'>
                                <Breadcrumbs 
                                    className='wikipage-breadcrumbs'
                                    style={{
                                        marginBottom: config.styles.spacing.default
                                    }}
                                >
                                    <Link to={config.routes.wiki.root}>Home</Link>
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

                                <div>
                                    {page.images.main.length > 0 &&
                                        <img
                                            src={config.paths.images + '/' + page.images.main} id='main-image'
                                            className='wikipage-main-image'
                                            style={{
                                                width: '100%',
                                                marginBottom: config.styles.spacing.default
                                            }}
                                        />
                                    }
                                </div>

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
                    </CardContent>
                </Card>
                <Alert
                    open={this.state.alert.open}
                    title={this.state.alert.title}
                    message={this.state.alert.message}
                    close={this.state.alert.close}
                    confirm={this.state.alert.confirm}
                />
            </div>
        );
    }
}