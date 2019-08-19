import React from 'react';

import { IDetailsItem } from '@interfaces';

import {
    Grid,
    Input
} from '@material-ui/core';

interface IDetailsInputListProps {
    details: IDetailsItem[]
}

interface IDetailsInputListState {
    details: IDetailsItem[]
}

export default class DetailsEditableList extends React.Component<IDetailsInputListProps, IDetailsInputListState> {
    constructor(props: IDetailsInputListProps, state: IDetailsInputListState) {
        super(props, state);

        this.state = {
            details: this.props.details
        }

        this.handleInput = this.handleInput.bind(this);
        this.renderDetailsItems = this.renderDetailsItems.bind(this);
    }

    handleInput(type: string, value: string | number, index: number): void {
        let details = [ ...this.state.details ];
        details[index as number][type] = value;

        this.setState({ details });
    }
    
    renderDetailsItems() {
        let items: any[] = [];
        this.props.details.forEach((detail: IDetailsItem, index: number) => {
            items.push(
                <Grid container>
                    <Grid item>
                        <Input
                            name={detail.label}
                            type="text"
                            value={this.state.details[index].label}
                            onChange={() => { this.handleInput('label', detail.label, index) }}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            name={detail.value}
                            type="text"
                            value={this.state.details[index].value}
                            onChange={() => { this.handleInput('value', detail.value, index) }}
                        />
                    </Grid>
                </Grid>
            );
        });

        return items;
    }
    

    render() {
        return (
            <div>
                {this.renderDetailsItems()}
            </div>
        );
    }
}