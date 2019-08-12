import React from 'react';

import { SearchApiClient, WikiApiClient } from '@api';
import { DataSources } from '@enums';

import SearchDrawer from '@components/SearchBox/SearchDrawer';

import {
    Grid,
    InputAdornment,
    List, ListItem,
    TextField,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { styled } from '@material-ui/styles';

interface ISearchBoxState {
    resultsTimeStamp: number;
    searchTerm: string;
    searchResults: any[];
    drawerOpen: boolean;
}

const SearchInput = styled(TextField)({
    marginTop: 8,
    background: "white",
});

export default class SearchBox extends React.Component<any, ISearchBoxState> {

    private WikiApiClient: WikiApiClient;
    private SearchApiClient: SearchApiClient;

    private searchTimer: any;
    
    constructor(props: any, state: ISearchBoxState) {
        super(props, state);

        this.WikiApiClient = new WikiApiClient();
        this.SearchApiClient = new SearchApiClient();

        this.state = {
            resultsTimeStamp: 0,
            searchTerm: "",
            searchResults: [],
            drawerOpen: false,
        }

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
    }

    componentDidMount() {
        const WikiSourceConfig = this.WikiApiClient.getSourceConfig();

        this.SearchApiClient.setSource(
            WikiSourceConfig.name, 
            WikiSourceConfig.files,
            WikiSourceConfig.target, 
            WikiSourceConfig.props,
        );
    }

    handleSearchInput(e: any): void {
        clearTimeout(this.searchTimer);
        const searchTerm = e.currentTarget.value;

        this.searchTimer = setTimeout(() => {
            let { resultsTimeStamp } = { ...this.state };
            const getAllPagesResponse = this.WikiApiClient.getAllPages();
    
            if (Date.now() - resultsTimeStamp > 30000 && getAllPagesResponse.status) {
                resultsTimeStamp = Date.now();
                this.SearchApiClient.refereshSource(DataSources.Wiki, getAllPagesResponse.data);
            }
    
            const searchResults = searchTerm.length >= 2 ?
                this.SearchApiClient.getSearchResults(searchTerm) : [];
    
            this.setState({
                searchTerm,
                searchResults,
                drawerOpen: (searchResults.length > 0 ? true : false)
            });
        }, 100);
    }

    handleInputClick() : void {
        if (this.state.searchResults.length > 0 && !this.state.drawerOpen) {
            this.setState({ drawerOpen: true });
        }
    }

    onDrawerClose() : void {
        this.setState({
            drawerOpen: false
        });
    }

    renderSearchResults() {
        let results: any[] = [];

        this.state.searchResults.forEach((source: any) => {
            let sourceResults: any[] = [];
            source.data.forEach((result: any) => {
                sourceResults.push(                
                    <ListItem key={result.id}>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Grid item>
                            {result.title}
                            </Grid>
                            <Grid>
                                <img 
                                    src="https://static.pokemonpets.com/images/monsters-images-300-300/196-Espeon.png" 
                                    width="50" 
                                    height="50"
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                );
            });

            results.push(
                <List key={source.name}>{sourceResults}</List>   
            );
        });

        return(
            <SearchDrawer 
                results={results} 
                open={this.state.drawerOpen}
                onOpen={() => {}}
                onClose={this.onDrawerClose}
            />
        );
    }

    render() {
        return(
            <div>
                <SearchInput
                    placeholder="Search…"
                    onChange={e => this.handleSearchInput(e)}
                    onClick={this.handleInputClick}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary"/>
                            </InputAdornment>
                        )
                    }}
                />

                    {this.renderSearchResults()}
            </div>
        )
    }
}