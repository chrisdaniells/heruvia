import React from 'react';

import SearchDrawer from '@components/SearchBox/SearchDrawer';
import ResultsTray from '@components/SearchBox/ResultsTray';

import {
    InputAdornment,
    TextField,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { styled } from '@material-ui/styles';

interface ISearchBoxProps {
    handleSearchInput(e?: any) : any;
    handleInputClick(e?: any) : any;
    drawerOpen : boolean;
    drawerOnClose() : any;
    searchResults: any[];
}

const SearchInput = styled(TextField)({
    marginTop: 8,
    background: "white",
});

export default class SearchBox extends React.Component<ISearchBoxProps, any> {

    constructor(props: ISearchBoxProps, state: any) {
        super(props, state);
    }

    render() {
        return(
            <div>
                <SearchInput
                    placeholder="Search…"
                    onChange={e => this.props.handleSearchInput(e as any)}
                    onClick={this.props.handleInputClick}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary"/>
                            </InputAdornment>
                        )
                    }}
                />

                <SearchDrawer
                    open={this.props.drawerOpen}
                    onOpen={() => {}}
                    onClose={this.props.drawerOnClose}
                >
                    <ResultsTray searchResults={this.props.searchResults} />
                </SearchDrawer>
            </div>
        )
    }
}