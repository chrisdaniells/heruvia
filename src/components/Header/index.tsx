import React from 'react';
import { Link } from 'react-router-dom';

import SearchBox from '@components/SearchBox';

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
} from '@material-ui/icons';

interface IHeaderState {
    drawerOpen: boolean;
}

export default class Header extends React.Component<any, IHeaderState> {

    constructor(props: any, state: IHeaderState) {
        super(props, state);

        this.state = {
            drawerOpen: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(): void {
        const { drawerOpen } = { ...this.state };
        this.setState({
            drawerOpen: !drawerOpen
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
                    <Toolbar variant="dense">
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
                                <SearchBox />
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
                    </List>
                </Drawer>
            </div>
        )
    }
}