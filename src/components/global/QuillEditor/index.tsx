import React from 'react';
import BodyEditor, { Quill } from 'react-quill';

import { FormControl, InputLabel } from '@material-ui/core';

import config from '@config';

interface IQuillEditorProps {
    id: string;
    formStyles?: { [key: string] : string };
    isFocused: boolean;
    onChange(id: string, content: string): any;
    onFocus(id: string): any;
    onBlur(): any;
}

export default class QuillEditor extends React.Component<IQuillEditorProps, any> {

    constructor(props: IQuillEditorProps, state: any) {
        super(props);
    }

    render() {
        if (!this.props.id) return;

        const formStyles = this.props.formStyles || {};

        return (
            <div 
                style={{ 
                    ...formStyles,
                    padding: config.styles.spacing.default,
                    border: '1px solid ' + config.styles.colours.line
                }}>
                <FormControl fullWidth>
                    <InputLabel
                        htmlFor={this.props.id}
                        focused={this.props.isFocused}
                        shrink={this.props.isFocused}
                        style={{
                            position: 'relative',
                            top: this.props.isFocused ? '0' : '46px',
                            textTransform: 'capitalize',
                        }}
                    >{this.props.id}</InputLabel>
                    <BodyEditor
                        id={this.props.id}
                        onChange={(content) => { this.props.onChange(this.props.id, content) }}
                        onFocus={() => { this.props.onFocus(this.props.id) }}
                        onBlur={() => { this.props.onBlur() }}
                        modules={{
                            clipboard: {
                                matchVisual: false,
                            }
                        }}
                        formats={[
                            'bold', 'italic', 'underline', 'strike', 'blockquote', 'indent', 'link', 'image'
                        ]}
                    />
                </FormControl>
                <div style={{ clear: 'both' }} />
            </div>
        );
    }
}