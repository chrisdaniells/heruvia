import React from 'react';
import { Link } from 'react-router-dom';

import { SubCategories, SubCategoryIcons, Categories } from '@enums';

import { 
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

interface ICategoryItemProps {
    subcategory: SubCategories;
    category: Categories;
    location: string;
}


export default class SubcategoryItem extends React.Component<ICategoryItemProps, any> {
    constructor(props: ICategoryItemProps, state: any) {
        super(props);

        this.renderIcon = this.renderIcon.bind(this);
    }

    renderIcon() {
        const key = Object.keys(SubCategories).find((key: string) => SubCategories[key as any] === this.props.subcategory);
        if (key) {
            const IconComponent = SubCategoryIcons[key as any];
            return (<ListItemIcon><IconComponent /></ListItemIcon>)
        }
    }

    render() {
        const link = "/wiki/list/subcategory/" + this.props.subcategory;
        return (
            <ListItem
                button 
                style={{ textTransform: "capitalize" }}
                component={Link}
                to={link}
                selected={link === this.props.location}
            >
                {this.renderIcon()}
                <ListItemText primary={this.props.subcategory} />
            </ListItem>
        )
    }
}