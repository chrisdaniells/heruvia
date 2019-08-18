import React from 'react';
import { Link } from 'react-router-dom';

import { SearchApiClient, WikiApiClient, IDefaultResponse } from '@api';
import config from '@config';
import { Categories, SubCategories} from '@enums';

import {
    Button,
    List,
    Paper,
    Tab,
    Tabs,
} from '@material-ui/core';
import { AddCircleOutline as AddIcon } from '@material-ui/icons';
import { PageListFilters } from '@apps/Wiki/enums';

import DisplayWrap from '@components/global/DisplayWrap';
import PageList from '@components/wiki/PageList';
import SubcategoryItem from '@components/wiki/SubcategoryItems';

interface IWikiAppProps {
    SearchApiClient: SearchApiClient;
    WikiApiClient: WikiApiClient;
}

interface IWikiAppState {
    selectedPagesTab: number;
    selectedCategoryTab: number;
    pages: any[];
}

const paperStyles = {
    overflowY: 'auto',
    marginBottom: config.styles.spacing.default,
    maxHeight: 600,
}

const tabStyles = {
    fontSize: 15,
}

export default class WikiApp extends React.Component<IWikiAppProps, IWikiAppState> {

    constructor(props: IWikiAppProps, state: IWikiAppState) {
        super(props, state);

        const pagesResponse: IDefaultResponse = this.props.WikiApiClient.getAllPages();

        this.state = {
            selectedPagesTab: 0,
            selectedCategoryTab: 0,
            pages: pagesResponse.data,
        }

        this.handlePageTabChange = this.handlePageTabChange.bind(this);
        this.handleCategoryTabChange = this.handleCategoryTabChange.bind(this);
        this.filterPages = this.filterPages.bind(this);
        this.renderCategoriesList = this.renderCategoriesList.bind(this);
        this.renderCategoriesTabs = this.renderCategoriesTabs.bind(this);
    }

    handlePageTabChange(_e: any, selectedPagesTab: any) {
        this.setState({ selectedPagesTab });
    }

    handleCategoryTabChange(_e: any, selectedCategoryTab: any) {
        this.setState({ selectedCategoryTab });
    }

    filterPages(filter: PageListFilters, quantity?: number) {
        let pages = [ ...this.state.pages ];

        switch(filter) {
            case PageListFilters.RecentlyModified:
                    pages.sort((a: any, b: any) => {
                        if (a.last_updated > b.last_updated) return -1;
                        else if (a.last_updated < b.last_updated) return +1;
                        else return 0;  
                    });
                break;
            case PageListFilters.RecentlyCreated:
                    pages.sort((a: any, b: any) => {
                        if (a.date_created > b.date_created) return -1;
                        else if (a.date_created < b.date_created) return +1;
                        else return 0;  
                    });
                break;
        }

        if (quantity !== undefined) pages = pages.splice(0, quantity);

        return pages;
    }

    renderCategoriesList() {
        let categories: any[] = [];
        Object.keys(config.categories).forEach((category: Categories, index: number) => {
            let subcategories: any[] = [];
            config.categories[category].forEach((subcategory: SubCategories) => {
                subcategories.push(
                    <SubcategoryItem
                        key={subcategory}
                        category={category}
                        subcategory={subcategory} 
                    />
                );
            });
            categories.push(
                <DisplayWrap
                    key={category}
                    show={this.state.selectedCategoryTab === index}
                >
                    <List>{subcategories}</List>
                </DisplayWrap>
            )
        });

        return (categories);
    }

    renderCategoriesTabs() {
        let categories: any[] = [];
        Object.keys(config.categories).forEach((category: Categories, index: number) => {
            categories.push(<Tab label={category} key={category} style={tabStyles} />)
        });
        return categories;
    }

    render() {
        console.log(this.props);
        return (
            <div style={{ ...config.styles.container, marginTop: 100, }}>
                <div style={{ textAlign: 'right', marginBottom: config.styles.spacing.default }}>
                    <Button
                        component={Link}
                        to={config.routes.wiki.edit}
                        variant='contained' 
                        color='primary'
                        className='Wiki_CreatePageButton'
                        style={{
                            borderRadius: 0,
                            color: 'white !important',
                            //padding: config.styles.spacing.thin + 'px 16px'
                        }}
                    ><AddIcon style={{ marginRight: config.styles.spacing.thin }}/>New Page</Button>
                </div>

                <Paper square className='u-height-transition'>
                    <Tabs
                        value={this.state.selectedPagesTab}
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={this.handlePageTabChange}
                        aria-label='disabled tabs example'
                    >
                        <Tab label={PageListFilters.RecentlyModified} style={tabStyles} />
                        <Tab label={PageListFilters.RecentlyCreated} style={tabStyles} />
                        <Tab label={PageListFilters.All + ' (' + this.state.pages.length + ')'} style={tabStyles} />
                    </Tabs>
                        <DisplayWrap 
                            show={this.state.selectedPagesTab === 0}
                            style={paperStyles}
                        >
                            <PageList pages={this.filterPages(PageListFilters.RecentlyModified, 5)} />
                        </DisplayWrap>
                        <DisplayWrap 
                            show={this.state.selectedPagesTab === 1}
                            style={paperStyles}
                        >
                            <PageList pages={this.filterPages(PageListFilters.RecentlyCreated, 5)} />
                        </DisplayWrap>
                        <DisplayWrap 
                            show={this.state.selectedPagesTab === 2}
                            style={paperStyles}
                        >
                            <PageList pages={this.filterPages(PageListFilters.All)} />
                        </DisplayWrap>
                </Paper>

                <Paper 
                    square 
                    className='u-height-transition'
                    style={{ marginBottom: config.styles.spacing.default }}
                >
                    <Tabs
                        value={this.state.selectedCategoryTab}
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={this.handleCategoryTabChange}
                        aria-label='disabled tabs example'
                    >
                        {this.renderCategoriesTabs()}
                    </Tabs>
                    {this.renderCategoriesList()}
                </Paper>
            </div>
        )
    }
}