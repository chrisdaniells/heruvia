import React from 'react';

import { SearchApiClient, WikiApiClient } from '@api';
import config from '@config';

import { Paper, Tab, Tabs } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { PageListFilters } from '@apps/Wiki/enums';

import DisplayWrap from '@components/global/DisplayWrap';
import PageList from '@components/wiki/PageList';

interface IWikiAppProps {
    SearchApiClient: SearchApiClient;
    WikiApiClient: WikiApiClient;
}

interface IWikiAppState {
    selectedPagesTab: number;
}

const FilterPaper = styled(Paper)({
    maxHeight: 600,
    overflowY: "auto",
    marginBottom: config.styles.spacing.default
});

export default class WikiApp extends React.Component<IWikiAppProps, IWikiAppState> {
    constructor(props: IWikiAppProps, state: IWikiAppState) {
        super(props, state);

        this.state = {
            selectedPagesTab: 0
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.filterPages = this.filterPages.bind(this);
    }

    handleTabChange(_e: any, selectedPagesTab: any) {
        this.setState({ selectedPagesTab })
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

    render() {
        return (
            <div 
                style={{
                    ...config.styles.container,
                    marginTop: 100,
                }}
            >
                <FilterPaper square className="u-height-transition">
                    <Tabs
                        value={this.state.selectedPagesTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label={PageListFilters.RecentlyModified} />
                        <Tab label={PageListFilters.RecentlyCreated} />
                        <Tab label={PageListFilters.All} />
                    </Tabs>
                        <DisplayWrap show={this.state.selectedPagesTab === 0}>
                            <PageList pages={this.filterPages(PageListFilters.RecentlyModified, 5)} />
                        </DisplayWrap>
                        <DisplayWrap show={this.state.selectedPagesTab === 1}>
                            <PageList pages={this.filterPages(PageListFilters.RecentlyCreated, 5)} />
                        </DisplayWrap>
                        <DisplayWrap show={this.state.selectedPagesTab === 2}>
                            <PageList pages={this.filterPages(PageListFilters.All)} />
                        </DisplayWrap>
                </FilterPaper>

                <FilterPaper square className="u-height-transition">
                    <Tabs
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={() => {}}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Categories" />
                    </Tabs>
                        <div>
                            Categories
                        </div>
                </FilterPaper>
            </div>
        )
    }
}