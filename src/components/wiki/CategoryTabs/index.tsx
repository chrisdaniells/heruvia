import React from 'react';

import {
    List,
    Paper,
    Tabs,
    Tab,
} from '@material-ui/core';

import config from '@config';
import { Categories, SubCategories } from '@enums';

import SubcategoryItem from '@components/wiki/SubcategoryItem';
import DisplayWrap from '@components/global/DisplayWrap';

interface ICategoryTabsProps {

}

interface ICategoryTabsState {
    selectedCategoryTab: number;
}

const tabStyles = {
    fontSize: 15,
}


export default class CategoryTabs extends React.Component<ICategoryTabsProps, ICategoryTabsState> {
    constructor(props: ICategoryTabsProps, state: ICategoryTabsState) {
        super(props, state);

        this.state = {
            selectedCategoryTab: 0,
        };

        this.handleCategoryTabChange = this.handleCategoryTabChange.bind(this);
    }

    handleCategoryTabChange(_e: any, selectedCategoryTab: any) {
        this.setState({ selectedCategoryTab });
    }

    renderCategoriesList() {
        let categories: any[] = [];
        Object.keys(config.wiki.categories).forEach((category: Categories, index: number) => {
            let subcategories: any[] = [];
            config.wiki.categories[category].forEach((subcategory: SubCategories) => {
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

        return categories;
    }
     

    renderCategoriesTabs() {
        let categories: any[] = [];
        Object.keys(config.wiki.categories).forEach((category: Categories, index: number) => {
            categories.push(<Tab label={category} key={category} style={tabStyles} />)
        });
        return categories;
    }

    render() {
        return (
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
        )
    }
}