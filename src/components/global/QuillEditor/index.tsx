import React from 'react';
import BodyEditor, { Quill } from 'react-quill';

import { FormControl, InputLabel } from '@material-ui/core';

import config from '@config';

interface IQuillEditorProps {
    id: string;
    formStyles?: { [key: string] : string };
    isFocused: boolean;
    value: string;
    formats: string[];
    onChange(id: string, content: string): any;
    onFocus(id: string): any;
    onBlur(): any;
    sanitize?: any;
}

export default class QuillEditor extends React.Component<IQuillEditorProps, any> {

    constructor(props: IQuillEditorProps, state: any) {
        super(props);

        this.sanitizeQuill = this.sanitizeQuill.bind(this);
    }

    componentDidMount() {
        this.sanitizeQuill();
    }

    sanitizeQuill() {
        let sanitize = null;
        if (this.props.sanitize !== undefined) {
            sanitize = this.props.sanitize;
        }
        const QuillLink = class QuillLink extends Quill.import('formats/link') {
            static create(value) {
                let node = super.create(value);
                value = sanitize(value);
                node.setAttribute('href', value);
                if (value.startsWith('#')) {
                    node.removeAttribute('target');
                }
                return node;
            }
        };

        Quill.register(QuillLink);
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
                        className="heruvia-text"
                        value={this.props.value}
                        onChange={(content) => { this.props.onChange(this.props.id, content) }}
                        onFocus={() => { this.props.onFocus(this.props.id) }}
                        onBlur={() => { this.props.onBlur() }}
                        formats={this.props.formats}
                        modules={{
                            clipboard: {
                                matchVisual: false,
                            }
                        }}
                    />
                </FormControl>
                <div style={{ clear: 'both' }} />
            </div>
        );
    }
}