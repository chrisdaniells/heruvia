import React from 'react';

import { IDetailsItem } from '@interfaces';
import config from '@config';

import {
    FormControl,
    Grid,
    Input,
    InputLabel,
} from '@material-ui/core';

interface IDetailsInputListProps {
    details: IDetailsItem[]
}

interface IDetailsInputListState {
    details: IDetailsItem[],
    current: IDetailsItem;
}

export default class DetailsEditableList extends React.Component<IDetailsInputListProps, IDetailsInputListState> {
    constructor(props: IDetailsInputListProps, state: IDetailsInputListState) {
        super(props, state);

        this.state = {
            details: this.props.details,
            current: { label: '', value: ''},
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
        this.renderDetailsItems = this.renderDetailsItems.bind(this);
    }

    handleInput(type: string, value: string | number, index: number): void {
        let details = [ ...this.state.details ];
        details[index as number][type] = value;

        this.setState({ details });
    }

    handleNewInput(type: string, value: string) {
        let current = { ...this.state.current };
        current[type] = value;

        this.setState({ current });
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
                                value={this.state.current}
                                onChange={(e) => { this.handleInput('label', e.target.value, index) }}
                                style={{
                                    marginRight: config.styles.spacing.default
                                }}
                            />
                    </Grid>
                    <Grid item>
                        <Input
                            name={detail.value}
                            type="text"
                            value={this.state.details[index].value}
                            onChange={(e) => { this.handleInput('value', e.target.value, index) }}
                        />
                    </Grid>
                </Grid>
            );
        });

        return items;
    }    

    render() {
        console.log(this.state);
        return (
            <div>
                <Grid container>
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor='detail-label'>Detail</InputLabel>
                            <Input
                                name='detail-label'
                                type="text"
                                value={this.state.current.label}
                                onChange={(e) => { this.handleNewInput('label', e.target.value) }}
                                style={{
                                    marginRight: config.styles.spacing.default
                                }}
                                placeholder="Detail"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Input
                            name='detail-value'
                            type="text"
                            value={this.state.current.value}
                            onChange={(e) => { this.handleNewInput('value', e.target.value) }}
                        />
                    </Grid>
                </Grid>
                {this.renderDetailsItems()}
            </div>
        );
    }
}