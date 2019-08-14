import React from 'react';

import { SearchApiClient, WikiApiClient } from '@api';
import config from '@config';

import { Paper, Tab, Tabs } from '@material-ui/core';
import { HomepageTabValues } from '@apps/Wiki/enums';

import DisplayWrap from '@components/global/DisplayWrap';

interface IWikiAppProps {
    SearchApiClient: SearchApiClient;
    WikiApiClient: WikiApiClient;
}

interface IWikiAppState {
    selectedTab: HomepageTabValues;
}

export default class WikiApp extends React.Component<IWikiAppProps, IWikiAppState> {
    constructor(props: IWikiAppProps, state: IWikiAppState) {
        super(props, state);

        this.state = {
            selectedTab: HomepageTabValues.All
        }

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(_e: any, selectedTab: any) {
        this.setState({ selectedTab })
    }

    render() {
        return (
            <div 
                style={{
                    ...config.styles.container,
                    marginTop: 100,
                }}
            >
                <Paper square>
                    <Tabs
                        value={this.state.selectedTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Active" />
                        <Tab label="Disabled" disabled />
                        <Tab label="Active" />
                    </Tabs>
                        <DisplayWrap show={this.state.selectedTab === HomepageTabValues.All}>
                            
                        </DisplayWrap>
                </Paper>
            </div>
        )
    }
}