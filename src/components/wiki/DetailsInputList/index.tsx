import React from 'react';

import { IDetailsItem } from '@interfaces';
import config from '@config';

import {
    Button,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
} from '@material-ui/core';
import {
    Cancel as CancelIcon
} from '@material-ui/icons';

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

        console.log(this.props.details);

        this.handleInput = this.handleInput.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleNewButtonClick = this.handleNewButtonClick.bind(this);
        this.handleDeleteDetail = this.handleDeleteDetail.bind(this);
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

    handleNewButtonClick() {
        if (this.state.current.label.length > 0 && this.state.current.value.length > 0) {
            this.setState(state => {
                state.details.push(state.current);
                return { 
                    details: state.details,
                    current: { label: '', value: ''}
                }
            });
        }
    }

    handleDeleteDetail(index: number) {
        let details = [ this.state.details ];
        const newDetails = details.splice(index, 1)
        console.log(newDetails);
        console.log(index);
        //this.setState({ details });
    }
    
    renderDetailsItems() {
        let items: any[] = [];
        this.props.details.forEach((detail: IDetailsItem, index: number) => {
            items.push(
                <Grid
                    container 
                    key={index}
                    style={{
                        marginTop: config.styles.spacing.thin
                    }}
                >
                    <Grid item>
                            <Input
                                name={detail.label}
                                type="text"
                                value={this.state.details[index].label}
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
                    <Grid item>
                        <IconButton onClick={() => this.handleDeleteDetail(index) }>
                                <CancelIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            );
        });

        return items;
    }    

    render() {
        console.log(this.state);
        return (
            <div style={{ marginBottom: config.styles.spacing.default }}>
                <Grid container>
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor='detail-label'>Details</InputLabel>
                            <Input
                                name='detail-label'
                                type="text"
                                value={this.state.current.label}
                                onChange={(e) => { this.handleNewInput('label', e.target.value) }}
                                style={{ marginRight: config.styles.spacing.default }}
                                placeholder="Detail"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor='detail-value'></InputLabel>
                            <Input
                                name='detail-value'
                                type="text"
                                value={this.state.current.value}
                                onChange={(e) => { this.handleNewInput('value', e.target.value) }}
                                style={{ marginRight: config.styles.spacing.default }}
                                placeholder={this.state.current.label.length > 0 ? 'Enter Value...' : ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item style={{ position: 'relative'}}>
                        {this.state.current.label.length > 0 && this.state.current.value.length > 0 &&
                            <Button
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: 100
                                }}
                                onClick={this.handleNewButtonClick}
                            >Add New</Button>
                        }
                    </Grid>
                </Grid>
                {this.renderDetailsItems()}
            </div>
        );
    }
}