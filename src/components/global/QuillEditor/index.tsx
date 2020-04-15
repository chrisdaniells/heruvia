import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

import { FormControl, InputLabel } from '@material-ui/core';

import config from '@config';

interface IQuillEditorProps {
    id: string;
    formStyles?: { [key: string] : string };
    isFocused?: boolean;
    value: string;
    toolbar?: string;
    placeholder?: string;
    onChange(id: string, content: string): any;
}

function insertSymbol(symbol: string) {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, symbol);
    this.quill.setSelection(cursorPosition + 1);
    return symbol;
}

const consonants = [
    'Đ', 'ð', 'Ç', 'ç', 'Ћ', 'þ', 'Ş', 'ş',
];
const vowels = [
    'Ä', 'ä', /*'Ã', 'ã',*/ 'Ë', 'ë', /*'Ẽ', 'ẽ',*/ 'Ï', 'ï', /*'Ĩ', 'ĩ',*/ 'Ö', 'ö', /*'Õ', 'õ',*/ 'Ü', 'ü', /*'Ũ', 'ũ',*/
];
const symbols = [
    '♀', '♂', '»', 'П', 'Ń', 'И', 'Џ', 'Ŋ', 'Ф', 'Ө', 'Ø',
];

export default class QuillEditor extends React.Component<IQuillEditorProps, any> {

    constructor(props: IQuillEditorProps, state: any) {
        super(props);

        this.sanitizeQuill = this.sanitizeQuill.bind(this);
        this.getToolbar = this.getToolbar.bind(this);
    }

    modules = {
        toolbar: {
            container: '#toolbar-' + this.props.id,
            handlers: {
                symbol: insertSymbol,
                consonant: insertSymbol,
                vowel: insertSymbol,
            },
        },
        clipboard: {
            matchVisual: false,
        },
        keyboard: {
            bindings: {
                timelineEnter: {
                    key: 13,
                    format: ['timeline'],
                    empty: true,
                    collapsed: true,
                    handler: function(range, context) {
                        this.quill.format('list', false, 'user');
                        if (context.format.indent) {
                          this.quill.format('indent', false, 'user');
                        }
                    }
                },
                ethCharLowercase: {
                    key: 68,
                    altKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, 'ð');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                ethCharUppercase: {
                    key: 68,
                    altKey: true,
                    shiftKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, 'Đ');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                shCharLowercase: {
                    key: 83,
                    altKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, 'ş');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                shCharUppercase: {
                    key: 83,
                    altKey: true,
                    shiftKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, 'Ş');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                thornCharLowercase: {
                    key: 84,
                    altKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, 'þ');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                thornCharUppercase: {
                    key: 84,
                    altKey: true,
                    shiftKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, 'Ћ');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                doubleArrowSymbol: {
                    key: 190,
                    altKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, '»');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                femaleSymbol: {
                    key: 70,
                    altKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, '♀');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
                maleSymbol: {
                    key: 77,
                    altKey: true,
                    handler: function() {
                        const cursorPosition = this.quill.getSelection().index;
                        this.quill.insertText(cursorPosition, '♂');
                        this.quill.setSelection(cursorPosition + 1);
                    } 
                },
            }
        }
    }

    componentDidMount() {
        this.sanitizeQuill();
    }

    sanitizeQuill() {
        const QuillLink = class QuillLink extends Quill.import('formats/link') {
            static create(value) {
                let node = super.create(value);
                value = this.sanitize(value);
                node.setAttribute('href', value);
                if (value.startsWith('#')) {
                    node.removeAttribute('target');
                }
                return node;
            }
            static sanitize(url: string) {
                return sanitizeLink(url);
            }
        };
        Quill.register(QuillLink, true);

        class Timeline extends Quill.import('formats/list') { };
        Timeline.blotName = 'timeline';
        Timeline.className = 'heruvia-timeline';
        Quill.register({ 'formats/timeline': Timeline }, true);
    }

    getToolbar() {
        switch (this.props.toolbar) {
            case 'inline':
                return (
                    <div id={'toolbar-' + this.props.id}>
                        <button className='ql-bold' />
                        <button className='ql-italic' />
                        <button className='ql-underline' />
                        <button className='ql-link' />
                        <button className='ql-underline' />
                        <button className='ql-clean' />
                        {this.getSymbolSelects()}
                    </div>
                );
            default:
                return (
                    <div id={'toolbar-' + this.props.id}>
                        <select className='ql-header' onChange={e => e.persist()}>
                            <option value=''>Normal</option>
                            <option value='1'>Heading 1</option>
                            <option value='2'>Heading 2</option>
                            <option value='3'>Heading 3</option>
                        </select>
                        <button className='ql-bold' />
                        <button className='ql-italic' />
                        <button className='ql-underline' />
                        <button className='ql-link' />
                        <button className='ql-underline' />
                        <button className='ql-list' value='ordered' />
                        <button className='ql-list' value='bullet' />
                        <button className='ql-clean' />
                        <button className='ql-timeline' ><strong>TL</strong></button>
                        {this.getSymbolSelects()}
                    </div>
                );
        }
    }

    getSymbolSelects() {
        return (
            <div>
                <div>
                    <label style={{float: 'left', margin: '0 5px'}}>C: </label>
                    <select className='ql-consonant' defaultValue='...'>
                        {consonants.map((symbol: string, key: number) => {
                            return <option key={'symbol-' + key} value={symbol}>{symbol}</option>;
                        })}
                    </select>
                </div>
                <div>
                    <label style={{float: 'left', margin: '0 5px'}}>V: </label>
                    <select className='ql-vowel' defaultValue='...'>
                        {vowels.map((symbol: string, key: number) => {
                            return <option key={'symbol-' + key} value={symbol}>{symbol}</option>;
                        })}
                    </select>
                </div>
                <div>
                    <label style={{float: 'left', margin: '0 5px'}}>S: </label>
                    <select className='ql-symbol' defaultValue='...'>
                        {symbols.map((symbol: string, key: number) => {
                            return <option key={'symbol-' + key} value={symbol}>{symbol}</option>;
                        })}
                    </select>
                </div>
            </div>
        );
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
                    >{this.props.placeholder}</InputLabel>
                    <div className={'text-editor-' + this.props.id}>
                        {this.getToolbar()}
                        <ReactQuill
                            id={this.props.id}
                            className={'heruvia-text' + (this.props.toolbar ? ' type-' + this.props.toolbar : '')}
                            value={this.props.value}
                            onChange={(content) => { this.props.onChange(this.props.id, content) }}
                            modules={this.modules}
                        />
                    </div>
                </FormControl>
                <div style={{ clear: 'both' }} />
            </div>
        );
    }
}

export function sanitizeLink(url, stripHash: boolean = false) {
    switch (url[0]) {
        case '?':
            url = url.replace('?', '');
            url = (!stripHash ? '#' : '') + config.routes.wiki.page + '/' + url.trim().replace(/\s+/g, '_');
            break;
        case '@':
            url = url.replace('@', '');
            url = (!stripHash ? '#' : '') + config.routes.timeline.scroll + url.trim().replace(/\s+/g, '_');
            break;
    }

    return url;
}