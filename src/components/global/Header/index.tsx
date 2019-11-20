import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import striptags from 'striptags';

import _ from '@lib/herulib';
import FuzzySearch from '@lib/fuzzySearch';

import config from '@config';
import { IStoreState, IEntry } from '@interfaces';

import SearchBox from '@components/global/SearchBox';

import { 
    AppBar, 
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar,
} from '@material-ui/core';
import {
    Chat as ChatIcon, 
    Menu as MenuIcon, 
    Public as PublicIcon,
    Timeline as TimelineIcon,
} from '@material-ui/icons';

interface IHeaderState {
    drawerOpen: boolean;
    searchDrawerOpen: boolean;
    searchTerm: string;
    searchResults: {
        wiki: any[],
        timeline: any[],
    };
}

@connect(
    (store: IStoreState) => {
        return {
            wiki: store.wiki,
            timeline: store.timeline
        };
    }
)
class Header extends React.Component<any, IHeaderState> {

    private searchTimer: any;
    private searchers: { [key: string]: FuzzySearch } = {
        wiki: new FuzzySearch(this.props.wiki.pages, ['title'], {sort: true}),
        timeline: new FuzzySearch(this.props.timeline.entries, ['body'], {sort: true})
    };

    constructor(props: any, state: IHeaderState) {
        super(props, state);

        this.state = {
            drawerOpen: false,
            searchDrawerOpen: false,
            searchTerm: '',
            searchResults: {
                wiki: [],
                timeline: [],
            },
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.onSearchDrawerClose = this.onSearchDrawerClose.bind(this);
    }

    componentDidUpdate() {
        const strippedTimeline = this.props.timeline.entries.map((entry: IEntry) => {
            return {
                ...entry,
                body: striptags(entry.body)
            }
        });
        if (this.props.wiki.pages.length > 0) this.searchers.wiki = new FuzzySearch(this.props.wiki.pages, ['title'], {sort: true});
        if (strippedTimeline.length > 0) this.searchers.timeline = new FuzzySearch(strippedTimeline, ['body'], {sort: true});
    }

    toggleDrawer(): void {
        const { drawerOpen } = { ...this.state };
        this.setState({
            drawerOpen: !drawerOpen
        });
    }

    handleSearchInput(e: any): void {
        clearTimeout(this.searchTimer);
        const searchTerm = _.lang.normalizeString(e.currentTarget.value);

        this.searchTimer = setTimeout(() => {
            const wikiResults = searchTerm.length >= 2 ? this.searchers.wiki.search(searchTerm).slice(0,4) : [];
            const timelineResults = searchTerm.length >= 2 ? this.searchers.timeline.search(searchTerm).slice(0,4) : [];
    
            this.setState({
                searchTerm,
                searchResults: {
                    wiki: wikiResults,
                    timeline: timelineResults,
                },
                searchDrawerOpen: (wikiResults.length > 0 || timelineResults.length > 0 ? true : false)
            });
        }, 100);
    }

    handleInputClick() : void {
        if ((this.state.searchResults.wiki.length > 0 || this.state.searchResults.timeline.length) && !this.state.searchDrawerOpen) {
            this.setState({ searchDrawerOpen: true });
        }
    }

    onSearchDrawerClose() {
        this.setState({ searchDrawerOpen: false });
    }

    render() {
        return (
            <div id='Header'>
                <AppBar 
                    position='fixed'
                    style={{ background: 'white' }}
                >
                    <Toolbar variant='dense' style={config.styles.container}>
                        <Grid container justify='space-between'>
                            <Grid item>
                                <IconButton 
                                    edge='start' 
                                    color='primary' 
                                    aria-label='menu'
                                    onClick={this.toggleDrawer}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <SearchBox
                                    handleSearchInput={this.handleSearchInput}
                                    handleInputClick={this.handleInputClick}
                                    drawerOpen={this.state.searchDrawerOpen}
                                    drawerOnClose={this.onSearchDrawerClose}
                                    searchResults={[
                                        {
                                            name: 'timeline',
                                            data: this.state.searchResults.timeline
                                        },
                                        {
                                            name: 'encyclopaedia',
                                            data: this.state.searchResults.wiki
                                        },
                                    ]}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
                    <List
                        subheader={
                            <ListSubheader 
                                component='div'
                                style={{
                                    fontSize: '1rem'
                                }}
                            >
                                Applications
                            </ListSubheader>
                        }
                        style={{ width: 250 }}
                    >
                        <ListItem 
                            button
                            component={Link}
                            to='/wiki'
                            onClick={this.toggleDrawer}
                        >
                            <ListItemIcon>
                                <PublicIcon />
                            </ListItemIcon>
                            <ListItemText primary='Encyclopedia' />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to='/timeline'
                            onClick={this.toggleDrawer}
                        >
                            <ListItemIcon>
                                <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText primary='Timeline' />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to='/languages'
                            onClick={this.toggleDrawer}
                        >
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary='Languages' />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(Header);