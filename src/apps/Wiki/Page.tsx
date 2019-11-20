import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import _ from '@lib/herulib';

import { getPages } from '@store/actions/wikiActions';

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
    Print as PrintIcon,
} from '@material-ui/icons';

import Alert, { IAlertProps } from '@components/global/Alert';
import CreatePageButton from '@components/wiki/CreatePageButton';
import ImageGallery from '@components/global/ImageGallery';
import { sanitizeLink } from '@components/global/QuillEditor';

import { IPage, IDetailsItem, IStoreState } from '@interfaces';

import config from '@config';

interface IPageProps {
    history: any;
    match: any;
    location: any;
    wiki?: any;
    getPages: any;
}

interface IPageState {
    alert: IAlertProps
}

@connect(
    (store: IStoreState) => {
        return {
            wiki: store.wiki,
        };
    },
    (dispatch: any) => {
        return {
            getPages: () => dispatch(getPages()),
        }
    }
)
export default class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps, state: IPageState) {
        super(props, state);

        let alert: IAlertProps = { ...config.alert.blankAlert };

        this.renderDetails = this.renderDetails.bind(this);
        this.renderArchivedVersions = this.renderArchivedVersions.bind(this);
        this.restoreArchive = this.restoreArchive.bind(this);
        this.resetAlert = this.resetAlert.bind(this);

        this.state = {
            alert,
        }
    }

    restoreArchive(archive: IPage) {
        archive.last_updated = Date.now();
        const restoreResponse = _.file.saveFile(archive, config.paths.wikipages + archive.id + '.json');
        
        if (restoreResponse) {
            this.props.getPages();
        } else {
            this.setState({
                alert: {
                    open: true,
                    title: 'Error',
                    message: 'The archived page could not be restored.',
                    close: {
                        onClose: this.resetAlert,
                        label: 'OK',
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
                this.setState({ alert: { ...config.alert.blankAlert }});
            }, 100);
        });
    }

    renderDetails(details: IDetailsItem[]) {
        const detailItems: any[] = [];

        details.forEach((detail: any, index: number) => {
            const isFirst = (index === 0);
            const isLast = (details.length-1 === index);

            const isLink = ['?', '!', '@', '&'].indexOf(detail.value[0]) > -1;

            detailItems.push(
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
                    <Grid item xs={6}>
                        {isLink ? <Link to={sanitizeLink(detail.value, true)}>{detail.value.substring(1, detail.value.length)}</Link> : detail.value}
                    </Grid>
                </Grid>
            );
        });

        return detailItems;
    }

    renderArchivedVersions() {
        const filepath = config.paths.wikiarchive + this.props.match.params.id + '.json';
        const archiveResponse = _.file.getFileJson(filepath);

        if (archiveResponse) {
            const archived: any[] = [];
            archiveResponse.forEach(archive => {
                const timestamp = new Date(archive.last_updated);
                archived.push(
                    <ListItem button key={archive.last_updated}>
                        <Grid container>
                            <Grid item xs={10} style={{ lineHeight: '25px' }}>{'Last Updated: ' + timestamp}</Grid>
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
    
            return (
                <div style={{
                    border: '1px solid ' + config.styles.colours.line,
                    padding: config.styles.spacing.default,
                    marginTop: 60
                }}>
                    <div>This page has the following archived versions:</div>
                    <List>{archived}</List>
                </div>
            );
        }
    }

    render() {
        const page = this.props.wiki.pages.find((page: IPage) =>
            page.id === this.props.match.params.id);

        return (
            <div style={{ ...config.styles.container, marginTop: 100 }}>
                <Card square style={{ marginBottom: config.styles.spacing.default }}>
                    <CardHeader
                        action={
                            <div>
                                <IconButton onClick={this.props.history.goBack}><BackIcon /></IconButton>
                                {page !== undefined &&
                                    <IconButton 
                                        component={Link}
                                        to={config.routes.wiki.print + '/' + page.id}
                                        target='_blank'
                                    >
                                        <PrintIcon />
                                    </IconButton>
                                }
                                {page !== undefined &&
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
                        title={page !== undefined ? page.title : ''}
                        className='Wiki_Page_Title'
                    />
                    <CardContent style={{ padding: config.styles.spacing.default }}>
                        {page === undefined &&
                            <div>
                                <p style={{ marginBottom: config.styles.spacing.default }}>
                                    The page {_.wiki.getPageTitleFromId(this.props.match.params.id)} has not been found. Would you like to create it now?
                                </p>
                                <div><CreatePageButton query={{ create: this.props.match.params.id }}/></div>

                                {this.renderArchivedVersions()}
                            </div>
                        }
                        {page !== undefined &&
                            <div id='Page' className='heruvia-text'>
                                <Breadcrumbs 
                                    className='wikipage-breadcrumbs'
                                    style={{ marginBottom: config.styles.spacing.default }}
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

                                {page.images.main.length > 0 &&
                                    <div style={{
                                        backgroundColor: '#f1f1f1',
                                        textAlign: 'center',
                                        marginBottom: config.styles.spacing.default
                                    }}>
                                        <img
                                            src={config.paths.images + '/' + page.images.main} id='main-image'
                                            className='wikipage-main-image'
                                            style={{ maxWidth: '100%', maxHeight: 500 }}
                                        />
                                    </div>
                                }

                                <Grid
                                    container
                                    alignItems='flex-start'
                                    style={{ marginBottom: config.styles.spacing.default }}
                                >
                                    {page.preface.length > 0 &&
                                        <Grid item
                                            xs={page.details.length > 0 ? 7 : 12}
                                            className='wiki-preface heruvia-text'
                                            style={{ paddingRight: config.styles.spacing.default }}
                                        >
                                            {ReactHtmlParser(page.preface)}
                                        </Grid>
                                    }
                                    {page.details.length > 0 &&
                                        <Grid item xs={5} className='wiki-details'
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
                                
                                {page.images.other.length > 0 &&
                                    <div style={{ marginTop: 40 }}>
                                        <ImageGallery images={page.images.other} />
                                    </div>
                                }
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