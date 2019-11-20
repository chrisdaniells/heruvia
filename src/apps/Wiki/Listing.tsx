import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { IPage, IStoreState, IStoreWikiState } from '@interfaces';

import config from '@config';

import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { ArrowBack as BackIcon, Home as HomeIcon } from '@material-ui/icons';

import PageList from '@components/wiki/PageList';
import CategoryTabs from '@components/wiki/CategoryTabs';

interface IListingProps {
    wiki?: IStoreWikiState;
    getPages?: any;
    match?: any;
    location?: any;
    history?: any;
}

interface IListingState {
}

@connect(
    (store: IStoreState) => {
        return {
            wiki: store.wiki,
        };
    }
)
export default class Listing extends React.Component<IListingProps, IListingState> {

    constructor(props: IListingProps, state: IListingState) {
        super(props, state);

        this.getFilteredPages = this.getFilteredPages.bind(this);
        this.renderCategoryListing = this.renderCategoryListing.bind(this);
    }

    getFilteredPages(): IPage[] {
        const attribute = this.props.match.params.attribute;
        const value = this.props.match.params.value.toLowerCase();
        return this.props.wiki.pages.filter((page: IPage) =>
            page.hasOwnProperty(attribute) && page[attribute] === value);
    }

    renderCategoryListing() {
        if (this.props.match.params.attribute === 'subcategory') {
            const category = Object.keys(config.wiki.categories).find((key: string) => {
                if (config.wiki.categories[key].includes(this.props.match.params.value)) return true;
                return false;
            });

            const preSelected = Object.keys(config.wiki.categories).indexOf(category);
            return <CategoryTabs preSelected={preSelected !== -1 ? preSelected : 0} location={this.props.location.pathname} />;
        }
   }

    render() {
        const filteredPages = this.getFilteredPages();
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
                        {filteredPages.length > 0 &&
                            <PageList pages={filteredPages} prefaceLength={300} edit={true} />
                        }
                        {filteredPages.length === 0 &&
                            <div>No Pages Found.</div>
                        }
                        
                    </CardContent>
            </Card>
                {this.renderCategoryListing()}
            </div>
        );
    }
}