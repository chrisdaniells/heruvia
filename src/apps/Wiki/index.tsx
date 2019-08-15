import React from 'react';

import { SearchApiClient, WikiApiClient } from '@api';
import config from '@config';
import { Categories, SubCategories} from '@enums';

import { 
    List,
    Paper,
    Tab,
    Tabs,
} from '@material-ui/core';
import { PageListFilters } from '@apps/Wiki/enums';

import DisplayWrap from '@components/global/DisplayWrap';
import PageList from '@components/wiki/PageList';
import SubcategoryItem from '@components/wiki/SubcategoryItem';

interface IWikiAppProps {
    SearchApiClient: SearchApiClient;
    WikiApiClient: WikiApiClient;
}

interface IWikiAppState {
    selectedPagesTab: number;
    selectedCategoryTab: number;
}

const paperStyles = {
    overflowY: "auto",
    marginBottom: config.styles.spacing.default,
    maxHeight: 600,
}

export default class WikiApp extends React.Component<IWikiAppProps, IWikiAppState> {
    constructor(props: IWikiAppProps, state: IWikiAppState) {
        super(props, state);

        this.state = {
            selectedPagesTab: 0,
            selectedCategoryTab: 0,
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
        const pagesResponse = this.props.WikiApiClient.getAllPages();
        let pages = pagesResponse.data;
        
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
            categories.push(<Tab label={category} key={category} />)
        });
        return categories;
    }

    render() {
        return (
            <div 
                style={{
                    ...config.styles.container,
                    marginTop: 100,
                }}
            >
                <Paper square className="u-height-transition">
                    <Tabs
                        value={this.state.selectedPagesTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handlePageTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label={PageListFilters.RecentlyModified} />
                        <Tab label={PageListFilters.RecentlyCreated} />
                        <Tab label={PageListFilters.All} />
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
                    className="u-height-transition"
                    style={{ marginBottom: config.styles.spacing.default }}
                >
                    <Tabs
                        value={this.state.selectedCategoryTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleCategoryTabChange}
                        aria-label="disabled tabs example"
                    >
                        {this.renderCategoriesTabs()}
                    </Tabs>
                    {this.renderCategoriesList()}
                </Paper>
            </div>
        )
    }
}