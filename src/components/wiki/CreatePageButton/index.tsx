import React from 'react';
import { Link } from 'react-router-dom';

import {
    Button,
    FormControl,
    MenuItem,
    Select,
} from '@material-ui/core';
import {
    Add as AddIcon,
} from '@material-ui/icons';

import config from '@config'

interface ICreatePageButtonProps {
    query?: { [key: string]: string | number };
}

interface ICreateButtonState {
    selectedTemplate: string;
}

export default class CreatePageButton extends React.Component<ICreatePageButtonProps, ICreateButtonState> {
   
    constructor(props: ICreatePageButtonProps, state: ICreateButtonState) {
        super(props, state);

        this.state = {
            selectedTemplate: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
    }

    handleChange(e: any) {
        this.setState({
            selectedTemplate: e.target.value
        });
    }

    renderSelect() {
        const templates: any[] = [];
        Object.keys(config.wiki.templates).forEach(t => {
            if (t !== 'base') templates.push(
                <MenuItem
                    key={t}
                    value={t}
                    style={{ textTransform: 'capitalize' }}
                >{t}</MenuItem>);
        });

        return (
            <FormControl>
                <Select
                    value={this.state.selectedTemplate}
                    onChange={this.handleChange}
                    inputProps={{ name: 'template' }}
                    style={{
                        width: 200,
                        height: 37,
                        textTransform: 'capitalize'
                    }}
                    displayEmpty
                >
                    <MenuItem
                        value=''
                        style={{ 
                            color: config.styles.colours.text.faint 
                        }}
                    >From Template</MenuItem>
                    {templates}
                </Select>
            </FormControl>
        );
    }

    render() {
        let query = this.state.selectedTemplate.length > 0 ? '?template=' + this.state.selectedTemplate : '';
        if (this.props.query) {
            Object.keys(this.props.query).forEach(k => {
                query = query + (query.length > 0 ? '&' : '?') + k + '=' + this.props.query[k];
            });
        }
        return (
            <div>
                <div style={{ display: 'inline-block', marginRight: config.styles.spacing.default }}>
                    {this.renderSelect()}
                </div>
                <div style={{ display: 'inline-block' }}>
                    <FormControl>
                        <Button
                            component={Link}
                            to={config.routes.wiki.edit + query}
                            variant='contained' 
                            color='primary'
                            className='Wiki_CreatePageButton'
                            style={{
                                borderRadius: 0,
                                color: 'white !important',
                                //padding: config.styles.spacing.thin + 'px 16px'
                            }}
                        >
                            <AddIcon style={{ marginRight: config.styles.spacing.thin }}/>New Page
                        </Button>
                    </FormControl>
                </div>
            </div>
        )
    }
}