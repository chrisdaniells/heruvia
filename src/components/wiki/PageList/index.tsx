import React from 'react';
import { Link } from 'react-router-dom';

import _ from '@lib/herulib';

import { IPage } from '@interfaces';
import config from '@config';

import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    List,
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Pageview as NoImageIcon,
} from '@material-ui/icons';

interface IPageListProps {
    pages: IPage[],
    prefaceLength?: number,
    edit?: boolean,
    itemOnClick?: any;
}

export default class PageList extends React.Component<IPageListProps, any> {
    
    constructor(props: IPageListProps, state: any) {
        super(props);

        this.renderPageList = this.renderPageList.bind(this);
    }
    
    renderPageList() {
        let list: any[] = [];

        this.props.pages.forEach((page: IPage) => {
            list.push(
                <ListItem
                    button
                    component={Link}
                    to={config.routes.wiki.page + '/' + page.url}
                    key={page.id}
                    style={{
                        color: config.styles.colours.text.default
                    }}
                    onClick={() => { this.props.itemOnClick ? this.props.itemOnClick() : '' }}
                >
                    <ListItemAvatar>
                        {page.images.main.length > 0 ?
                            <Avatar src={config.paths.images + page.images.main} />
                            : <Avatar style={{ background: config.styles.colours.line }}>
                                <NoImageIcon />
                            </Avatar>
                        }
                    </ListItemAvatar>
                    <ListItemText
                        primary={page.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component='span'
                                    variant='body2'
                                    color='textPrimary'
                                >
                                    {_.text.getReducedPrefaceText(page.preface, this.props.prefaceLength ? this.props.prefaceLength : 300)}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    {this.props.edit && 
                        <ListItemSecondaryAction>
                            <IconButton
                                component={Link}
                                to={config.routes.wiki.edit + '/' + page.id}
                                edge='end' 
                                aria-label='edit'
                            >                        
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>      
            )
        });

        return list;
    }

    render() {
        return (
            <List>
                {this.renderPageList()}
            </List>
        )
    }
}