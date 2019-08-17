import React from 'react';
import { Link } from 'react-router-dom';

import config from '@config';
import { DataSources } from '@enums';

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
    Book as BookIcon,
    Chat as ChatIcon, 
    Menu as MenuIcon, 
    Public as PublicIcon,
    Timeline as TimelineIcon,
} from '@material-ui/icons';

interface IHeaderState {
    drawerOpen: boolean;
    searchDrawerOpen: boolean;
    searchTerm: string;
    searchResults: any[];
}

export default class Header extends React.Component<any, IHeaderState> {

    private searchTimer: any;

    constructor(props: any, state: IHeaderState) {
        super(props, state);

        this.state = {
            drawerOpen: false,
            searchDrawerOpen: false,
            searchTerm: "",
            searchResults: [],
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.onSearchDrawerClose = this.onSearchDrawerClose.bind(this);
    }

    componentDidMount() {
        const WikiSourceConfig = this.props.WikiApiClient.getSourceConfig();

        this.props.SearchApiClient.setSource(
            WikiSourceConfig.name, 
            WikiSourceConfig.files,
            WikiSourceConfig.target, 
            WikiSourceConfig.props,
        );
    }

    toggleDrawer(): void {
        const { drawerOpen } = { ...this.state };
        this.setState({
            drawerOpen: !drawerOpen
        });
    }

    handleSearchInput(e: any): void {
        clearTimeout(this.searchTimer);
        const searchTerm = e.currentTarget.value;

        this.searchTimer = setTimeout(() => {
            const getAllPagesResponse = this.props.WikiApiClient.getAllPages();
    
            this.props.SearchApiClient.refereshSource(DataSources.Wiki, getAllPagesResponse.data);
    
            const searchResults = searchTerm.length >= 2 ?
                this.props.SearchApiClient.getSearchResults(searchTerm) : [];
    
            this.setState({
                searchTerm,
                searchResults,
                searchDrawerOpen: (searchResults.length > 0 ? true : false)
            });
        }, 100);
    }

    handleInputClick() : void {
        if (this.state.searchResults.length > 0 && !this.state.searchDrawerOpen) {
            this.setState({ searchDrawerOpen: true });
        }
    }

    onSearchDrawerClose() {
        this.setState({
            searchDrawerOpen: false
        });
    }

    render() {
        return (
            <div>
                <AppBar 
                    position="fixed"
                    style={{
                        background: "white"
                    }}
                >
                    <Toolbar 
                        variant="dense" 
                        style={config.styles.container}
                    >
                        <Grid container justify="space-between">
                            <Grid item>
                                <IconButton 
                                    edge="start" 
                                    color="primary" 
                                    aria-label="menu"
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
                                    searchResults={this.state.searchResults}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Drawer
                    open={this.state.drawerOpen}
                    onClose={this.toggleDrawer}
                >
                    <List
                        subheader={
                            <ListSubheader 
                                component="div"
                                style={{
                                    fontSize: "1rem"
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
                            to="/wiki"
                        >
                            <ListItemIcon>
                                <PublicIcon />
                            </ListItemIcon>
                            <ListItemText primary="Encyclopedia" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/languages"
                        >
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary="Languages" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/timeline"
                        >
                            <ListItemIcon>
                                <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Timeline" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/notes"
                        >
                            <ListItemIcon>
                                <BookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notes" />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
        )
    }
}