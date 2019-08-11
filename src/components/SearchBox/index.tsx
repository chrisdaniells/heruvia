import React from 'react';

import { SearchApiClient, WikiApiClient } from '@api';
import { DataSources } from '@enums';

import { 
    Card, CardContent, CardMedia,
    Grid,
    List, ListItem,
    TextField,
} from '@material-ui/core';
// import { } from '@material-ui/icons';
import { styled } from '@material-ui/styles';

interface ISearchBoxState {
    resultsTimeStamp: number;
    searchTerm: string;
    searchResults: any[];
}

const SearchInput = styled(TextField)({
    marginTop: 9,
    background: "white",
});

const SearchResult = styled(Card)({
    position: "absolute",
    right: 24,
    width: "30%",
    maxWidth: 500,
    minWidth: 350
});

export default class SearchBox extends React.Component<any, ISearchBoxState> {

    private WikiApiClient: WikiApiClient;
    private SearchApiClient: SearchApiClient;

    constructor(props: any, state: ISearchBoxState) {
        super(props, state);

        this.WikiApiClient = new WikiApiClient();
        this.SearchApiClient = new SearchApiClient();

        this.state = {
            resultsTimeStamp: 0,
            searchTerm: "",
            searchResults: [],
        }

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
    }

    componentDidMount() {
        const props = ["id", "url", "title", "preface", "images"];
        const getAllPagesResponse = this.WikiApiClient.getAllPages();

        this.SearchApiClient.setSource(
            DataSources.Wiki, 
            getAllPagesResponse.status ? getAllPagesResponse.data : [],
            "title", 
            props
        );
    }

    handleSearchInput(e: any): void {
        const searchTerm = e.currentTarget.value;
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
        });
    }

    renderSearchResults() {
        let results: any[] = [];

        this.state.searchResults.forEach((source: any) => {
            let sourceResults: any[] = [];
            source.data.forEach((result: any) => {
                sourceResults.push(                
                    <ListItem key={result.id} style={{  }}>
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
            <SearchResult square> 
                <List>
                    {results}
                </List>
            </SearchResult>
        );
    }

    render() {
        return(
            <div>
                <SearchInput
                    placeholder="Search…"
                    onChange={e => this.handleSearchInput(e)}
                />
                { this.state.searchResults.length > 0 &&
                    this.renderSearchResults()
                }
            </div>
        )
    }
}