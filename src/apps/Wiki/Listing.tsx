import React from 'react';
import { Link } from 'react-router-dom';

import { WikiApiClient } from '@api';

import { IPage } from '@interfaces';

import config from '@config';

import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
} from '@material-ui/core';
import {
    ArrowBack as BackIcon,
    Home as HomeIcon,
} from '@material-ui/icons';

import PageList from '@components/wiki/PageList';
import CategoryTabs from '@components/wiki/CategoryTabs';
import Alert, { IAlertProps } from '@components/global/Alert';

interface IListingProps {
    WikiApiClient: WikiApiClient;
    match: any;
    history: any;
    location: any;
}

interface IListingState {
    pages: IPage[] | [];
    alert: IAlertProps;
}

export default class Listing extends React.Component<IListingProps, IListingState> {

    constructor(props: IListingProps, state: IListingState) {
        super(props, state);

        let alert: IAlertProps = { open: false, title: '', message: '', close: false, confirm: false };

        this.fetchPages = this.fetchPages.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
        this.renderCategoryListing = this.renderCategoryListing.bind(this);

        this.state = {
            pages: [],
            alert: alert,
        };
    }

    componentDidMount() {
        this.fetchPages();
    }

    componentDidUpdate(prevProps: IListingProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.fetchPages();
        }
    }

    fetchPages() {
        const { params } = this.props.match;
        const pageResponse = this.props.WikiApiClient.getPagesByAttribute(params.attribute, params.value);

        let {pages, alert } = { ...this.state };

        pages = pageResponse.status ? pageResponse.data : [];
        alert = !pageResponse.status ? {
            open: true,
            title: 'List not found',
            message: 'A list for ' + params.attribute + ' : ' + params.value + ' could not been found.',
            close: {
                onClose: this.resetAlert,
                label: "OK",
            },
            confirm: false,
        } : alert;

        this.setState({
            pages,
            alert,
        });
    }

    resetAlert(): void {
        this.setState (state => ({
            alert: { ...state.alert, open: false }
        }),() => {
            // Otherwise text disappears before dialog closes
            setTimeout(() => {
                this.props.history.goBack();
            }, 50);
        });
    }

    renderCategoryListing() {
        if (this.props.match.params.attribute === "subcategory") {
            const category = Object.keys(config.wiki.categories).find((key: string) => {
                if (config.wiki.categories[key].includes(this.props.match.params.value)) {
                    return true;
                }
                return false;
            });

            const preSelected = Object.keys(config.wiki.categories).indexOf(category);
            return <CategoryTabs preSelected={preSelected !== -1 ? preSelected : 0} location={this.props.location.pathname} />;
        }
   }

    render() {
        console.log(this.props);
        return(
            <div style={{ ...config.styles.container, marginTop: 100 }}>
                <Card square style={{ marginBottom: config.styles.spacing.default }}>
                    <CardHeader
                        action={
                            <div>
                                <IconButton onClick={this.props.history.goBack}><BackIcon /></IconButton>
                                <IconButton component={Link} to={config.routes.wiki.root}><HomeIcon /></IconButton>
                            </div>
                        }
                        title={ 'Pages in ' + this.props.match.params.value }
                        style={{ textTransform: 'capitalize' }}
                    />
                    <CardContent style={{ padding: config.styles.spacing.default }}>
                        <PageList
                            pages={this.state.pages}
                            prefaceLength={300}
                            edit={true}
                        />
                        <Alert
                            open={this.state.alert.open}
                            title={this.state.alert.title}
                            message={this.state.alert.message}
                            close={this.state.alert.close}
                            confirm={this.state.alert.confirm}
                        />
                    </CardContent>
            </Card>
                {this.renderCategoryListing()}
            </div>
        );
    }
}