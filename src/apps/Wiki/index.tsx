import React from 'react';
import { connect } from 'react-redux';

import _ from '@lib/herulib';

import { PageListFilters } from '@enums';
import { IStoreState, IStoreWikiState } from'@interfaces';
import config from '@config';

import { Paper, Tab, Tabs } from '@material-ui/core';

import DisplayWrap from '@components/global/DisplayWrap';
import PageList from '@components/wiki/PageList';
import CategoryTabs from '@components/wiki/CategoryTabs';
import CreatePageButton from '@components/wiki/CreatePageButton';

interface IWikiAppProps {
    getPages?: any;
    wiki?: IStoreWikiState;
}

interface IWikiAppState {
    selectedPagesTab: number;
}

const paperStyles = {
    overflowY: 'auto',
    marginBottom: config.styles.spacing.default,
    maxHeight: 600,
}

const tabStyles = {
    fontSize: 15,
}

@connect(
    (store: IStoreState) => {
        return {
            wiki: store.wiki,
        };
    }
)
export default class WikiApp extends React.Component<IWikiAppProps, IWikiAppState> {

    constructor(props: IWikiAppProps, state: IWikiAppState) {
        super(props, state);

        this.state = {
            selectedPagesTab: 0,
        }

        this.handlePageTabChange = this.handlePageTabChange.bind(this);
        this.filterPages = this.filterPages.bind(this);
    }

    handlePageTabChange(_e: any, selectedPagesTab: any) {
        this.setState({ selectedPagesTab });
    }

    filterPages(filter: PageListFilters, quantity?: number) {
        let pages = [ ...this.props.wiki.pages ];

        switch(filter) {
            // TODO Move Sort Functions to Herulib
            case PageListFilters.All:
                pages.sort((a: any, b: any) => {
                        if (_.lang.normalizeString(a.title) > _.lang.normalizeString(b.title)) return +1;
                        else if (_.lang.normalizeString(a.title) < _.lang.normalizeString(b.title)) return -1;
                        else return 0;  
                    });
                break;
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
            <div style={{ ...config.styles.container, marginTop: 100, }}>
                <div style={{ textAlign: 'right', marginBottom: config.styles.spacing.default }}>
                    <CreatePageButton />
                </div>

                <Paper square className='u-height-transition'>
                    <Tabs
                        value={this.state.selectedPagesTab}
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={this.handlePageTabChange}
                        aria-label='disabled tabs example'
                    >
                        <Tab label={PageListFilters.All + ' (' + this.props.wiki.pages.length + ')'} style={tabStyles} />
                        <Tab label={PageListFilters.RecentlyModified} style={tabStyles} />
                        <Tab label={PageListFilters.RecentlyCreated} style={tabStyles} />
                        
                    </Tabs>
                        <DisplayWrap show={this.state.selectedPagesTab === 0} style={paperStyles}>
                            <PageList pages={this.filterPages(PageListFilters.All)} edit={true} />
                        </DisplayWrap>
                        <DisplayWrap show={this.state.selectedPagesTab === 1} style={paperStyles}>
                            <PageList 
                                pages={this.filterPages(PageListFilters.RecentlyModified, 5)} 
                                edit={true}
                            />
                        </DisplayWrap>
                        <DisplayWrap show={this.state.selectedPagesTab === 2} style={paperStyles}>
                            <PageList 
                                pages={this.filterPages(PageListFilters.RecentlyCreated, 5)}
                                edit={true}
                            />
                        </DisplayWrap>
                </Paper>

                <CategoryTabs />
            </div>
        )
    }
}