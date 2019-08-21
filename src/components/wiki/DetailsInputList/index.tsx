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
    details: IDetailsItem[],
    onAdd(state: IDetailsItem[]): void,
}

interface IDetailsInputListState {
    details: IDetailsItem[],
    current: IDetailsItem;
}

export default class DetailsEditableList extends React.Component<IDetailsInputListProps, IDetailsInputListState> {
    private draggedItem: number;
    private dropPosition: number;
    
    constructor(props: IDetailsInputListProps, state: IDetailsInputListState) {
        super(props, state);

        this.state = {
            details: this.props.details,
            current: { label: '', value: ''},
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);
        this.handleNewButtonClick = this.handleNewButtonClick.bind(this);
        this.handleDeleteDetail = this.handleDeleteDetail.bind(this);
        this.handleDetailDrag = this.handleDetailDrag.bind(this);
        this.handleDetailDragOver = this.handleDetailDragOver.bind(this);
        this.handleDetailDragEnd = this.handleDetailDragEnd.bind(this);
        this.renderDetailsItems = this.renderDetailsItems.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e: any) {
        if (e.keyCode === 13 && document.activeElement.id === 'detail-value') {
            e.preventDefault();
            this.handleNewButtonClick();
            return false;
        }
        return true;
    }

    handleInput(type: string, value: string | number, index: number): void {
        let details = [ ...this.state.details ];
        details[index as number][type] = value;

        this.setState({ 
            details
        }, () => {
            this.props.onAdd(this.state.details);
        });
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
            }, () => {
                this.props.onAdd(this.state.details);
                document.getElementById('detail-label').focus();
            });
        }
    }

    handleDeleteDetail(index: number) {
        let details = [ ...this.state.details ];
        details.splice(index, 1);
        
        this.setState({ 
            details 
        }, () => {
            this.props.onAdd(this.state.details);
            document.getElementById('detail-label').focus();
        });
    }

    handleDetailDrag(e: any, index: number) {
        e.dataTransfer.setData("index", index);
        e.dataTransfer.effectAllowed = "move";

        this.draggedItem = index;
    }

    handleDetailDragOver(e: any, index: number) {
        e.preventDefault();
        if (this.draggedItem === index) return;

        this.dropPosition = index;
    }

    handleDetailDragEnd() {
        let details = this.state.details.filter((detail, index) => {
            return index !== this.draggedItem;
        });
        
        details.splice(this.dropPosition, 0, this.state.details[this.draggedItem]);

        this.setState({ 
            details 
        }, () => {
            this.props.onAdd(this.state.details);
        });
    }
    
    renderDetailsItems() {
        let items: any[] = [];
        this.state.details.forEach((detail: IDetailsItem, index: number) => {
            items.push(
                <Grid 
                    container
                    key={index}
                    style={{ marginTop: 5 }}
                    onDragStart={(e) => this.handleDetailDrag(e, index)} 
                    onDragOver={(e) => this.handleDetailDragOver(e, index)}
                    onDrop={this.handleDetailDragEnd}
                    draggable
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
                        <IconButton 
                            onClick={() => this.handleDeleteDetail(index)}
                            size='small'
                        >
                                <CancelIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            );
        });

        return items;
    }    

    render() {
        return (
            <div style={{ marginBottom: config.styles.spacing.default }}>
                <Grid container style={{ marginBottom: config.styles.spacing.thin }}>
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor='detail-label'>Details</InputLabel>
                            <Input
                                name='detail-label'
                                id='detail-label'
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
                                id='detail-value'
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
                            >Add</Button>
                        }
                    </Grid>
                </Grid>
                {this.renderDetailsItems()}
            </div>
        );
    }
}