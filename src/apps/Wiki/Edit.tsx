import React from 'react';
import { Link } from 'react-router-dom';
import { Quill } from 'react-quill';

import { SearchApiClient, WikiApiClient } from '@api';
import { IPage } from '@interfaces';
import config from '@config';

import QuillEditor from '@components/global/QuillEditor';
import DetailsInputList from '@components/wiki/DetailsInputList';

import {
    Button, IconButton,
    Card, CardHeader, CardActions, CardContent,
    FormControl,
    Input, InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import {
    ArrowBack as CancelIcon,
    Clear as ClearIcon,
    Delete as DeleteIcon,
    Home as HomeIcon,
    Image as ImageIcon,
    Save as SaveIcon,
} from '@material-ui/icons';

interface IEditProps {
    SearchApiClient: SearchApiClient;
    WikiApiClient: WikiApiClient;
    match?: any;
    history?: any;
}

interface IEditState {
    page: IPage | null;
    quillFocus: string | null;
}

const inputStyle = {
    marginBottom: config.styles.spacing.default
}

export default class Edit extends React.Component<IEditProps, IEditState> {
    constructor(props: IEditProps, state: IEditState) {
        super(props, state);

        let page = null;
        if (this.props.match.params.id !== undefined) {
            const pageResponse = this.props.WikiApiClient.getPageById(this.props.match.params.id);
            if (pageResponse.status) {
                page = pageResponse.data;
            } else {
                // Create Page?
            }
        } else {
            page = this.props.WikiApiClient.getPageTemplate();
        }
        
        this.state = {
            page,
            quillFocus: null,
        }

        this.sanitizeQuill = this.sanitizeQuill.bind(this);
        this.handleQuillFocus = this.handleQuillFocus.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleQuillFormChange = this.handleQuillFormChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.renderFormMainImage = this.renderFormMainImage.bind(this);
        this.renderFormTitle = this.renderFormTitle.bind(this);
        this.renderFormCategorySubcategory = this.renderFormCategorySubcategory.bind(this);
        this.renderFormDetails = this.renderFormDetails.bind(this);
        this.renderFormQuill = this.renderFormQuill.bind(this);
        this.renderFormOtherImages = this.renderFormOtherImages.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    sanitizeQuill() {
        const QuillLink = class QuillLink extends Quill.import('formats/link') {
            static create(value: any) {
                let node = super.create(value);
                value = this.sanitize(value);
                node.setAttribute('href', value);
                if(value.startsWith('#')) {
                    node.removeAttribute('target');
                  }
                return node;
            }
            static sanitize(url: string) {
                if (url[0] == '#') { 
                    url = url.replace('#', '');
                    url = url.replace('/view/', '');
                    url = '#/view/' + this.props.WikiApiClient.getPageIdFromTitle(url);
                };
                return url;
            }
        };

        Quill.register(QuillLink);
    }

    handleQuillFocus(editor: string | null = null) {
        this.setState((state: any) => ({
            quillFocus: state.quillFocus !== editor ? editor : null
        }));
    }

    handleKeyDown(e: any) {
        if (!(e.key === 's' && e.ctrlKey)) return true;
        e.preventDefault();
        this.handleSave();
        return false;
    }

    handleFormChange(e: any) {
        console.log(e.target);
        const { name, value } = e.target;
        let page = { ...this.state.page };
        page[name] = value;
        this.setState({ page });
    }

    handleQuillFormChange(editor: string, content: string) {
        const parser = new DOMParser();
        const { textContent } = parser.parseFromString(content, 'text/html').documentElement;

        let page = { ...this.state.page }
        page[editor as string] = textContent.trim().length > 0 ? content : '';

        this.setState({ page });
    }

    handleImageUpload(e: any) {
        const { files, name } = e.target;
        let page = { ...this.state.page };

        console.log(files);
        
        switch(name) {
            case "main-image":
                page.images.main = files[0].path;
                break;
            case "other-images":
                page.images.other = Object.keys(files).map((key: number | string) => { return files[key].path });
                break;
        }
        this.setState({ page });
    }

    handleDelete() {

    }

    handleSave() {

    }

    renderFormMainImage() {
        return (
            <div>
                {this.state.page.images.main.length > 0 &&
                    <div style={{ 
                            textAlign: "center", 
                            marginBottom: config.styles.spacing.thin,
                            position: "relative"
                        }}
                    >
                        <IconButton
                            className="Wiki_IconOverlayBlend"
                            style={{
                                position: "absolute",
                                top: config.styles.spacing.default,
                                right: config.styles.spacing.default + 10,
                            }}
                            onClick={() => {
                                this.setState((state) => {
                                    state.page.images.main = '';
                                    return { page: state.page }
                                });
                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                        <img 
                            src={this.state.page.images.main}
                            style={{
                                height: "auto",
                                width: "auto",
                                maxHeight: 500,
                                maxWidth: "100%",
                                margin: "0 auto"
                            }}
                        />
                    </div>
                }
                <Button 
                    variant='outlined' 
                    component='label'
                    style={{
                        width: '100%',
                        borderRadius: 0,
                        border: 'none',
                        height: this.state.page.images.main.length ? 50 : 200,
                        color: '#000000',
                        fontSize: 15,
                        marginBottom: config.styles.spacing.thin
                    }}
                >
                    <ImageIcon 
                        style={{ 
                            marginRight: config.styles.spacing.thin 
                        }}/>{this.state.page.images.main.length ? 'Change' : 'Upload' } Main Image
                    <input
                        accept='image/*'
                        name='main-image'
                        type='file'
                        style={{ display: 'none' }}
                        onChange={(e) => { this.handleImageUpload(e) }}
                    />
                </Button>
            </div>
        );
    }

    renderFormOtherImages() {
        return(
            <Button 
                variant='outlined' 
                component='label'
                style={{
                    width: '100%',
                    borderRadius: 0,
                    border: 'none',
                    height: 50,
                    color: '#000000',
                    fontSize: 15,
                    marginBottom: config.styles.spacing.thin
                }}
            >
                <ImageIcon 
                    style={{ 
                        marginRight: config.styles.spacing.thin 
                    }}/>{this.state.page.images.main.length ? 'Change' : 'Upload' } Additional Images
                <input
                    accept='image/*'
                    multiple
                    name='other-images'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={(e) => { this.handleImageUpload(e) }}
                />
            </Button>
        );
    }

    renderFormTitle() {
        return(
            <FormControl fullWidth style={inputStyle}>
                <InputLabel htmlFor='title'>Title</InputLabel>
                <Input 
                    name='title'
                    value={this.state.page.title}
                    onChange={(e) => { this.handleFormChange(e) }}
                />
            </FormControl>
        );
    }

    renderFormCategorySubcategory() {
        return  (
            <div>
                <FormControl fullWidth style={inputStyle}>
                    <InputLabel htmlFor='category'>Category</InputLabel>
                    <Select
                        value={this.state.page.category}
                        onChange={(e) => { this.handleFormChange(e) }}
                        inputProps={{
                            name: 'category'
                        }}
                    >
                        <MenuItem value=''>Select Category</MenuItem>
                        <MenuItem value='juan'>Category 1</MenuItem>
                        <MenuItem value='carlos'>Category 2</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth style={inputStyle}>
                    <InputLabel htmlFor='subcategory'>Subcategory</InputLabel>
                    <Select
                        value={this.state.page.subcategory}
                        onChange={(e) => { this.handleFormChange(e) }}
                        inputProps={{
                            name: 'subcategory'
                        }}
                    >
                        <MenuItem value=''>Select Subcategory</MenuItem>
                        <MenuItem value='juann'>Subcategory 1</MenuItem>
                        <MenuItem value='carloss'>Subcategory 2</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    renderFormDetails() {
        if (this.state.page.details.length > 0) {
            return <DetailsInputList details={this.state.page.details} />
        } else {
            return ( <div 
                        onClick={() => {
                            this.setState((state) => {
                                state.page.details.push({label:'',value:''})
                                return { page: state.page }
                            });
                        }}
                    >Add Detail</div>)
        }
        
    }

    renderFormQuill(editor: string) {
        const isFocused = this.state.quillFocus === editor || this.state.page[editor as string].length !== 0;
        return (
            <QuillEditor
                id={editor}
                formStyles={inputStyle}
                isFocused={isFocused}
                onChange={this.handleQuillFormChange}
                onFocus={this.handleQuillFocus}
                onBlur={this.handleQuillFocus}
            />
        );
    }

    render() {
        console.log(this.state);

        return(
            <div style={{ ...config.styles.container, marginTop: 100, }}>
                <Card square style={{ marginBottom: config.styles.spacing.default }}>
                    <CardHeader
                        action={
                            <div>
                                <IconButton onClick={this.props.history.goBack}>
                                    <CancelIcon />
                                </IconButton>
                                <IconButton component={Link} to={config.routes.wiki.root}>
                                    <HomeIcon />
                                </IconButton>
                            </div>
                        }
                        title='Page Creator'
                    />
                    <CardContent>
                        {this.renderFormMainImage()}
                        {this.renderFormTitle()}
                        {this.renderFormCategorySubcategory()}
                        {this.renderFormQuill('preface')}
                        {this.renderFormQuill('body')}
                        {this.renderFormOtherImages()}
                    </CardContent>
                    <CardActions>
                        { this.state.page.id !== null &&
                            <IconButton onClick={this.handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        <Button 
                            onClick={this.handleSave}
                            color='secondary'
                            variant='contained'
                            style={{ 
                                margin: '0 ' + config.styles.spacing.thin + 'px 0 auto', 
                                color: 'white',
                                borderRadius: 0,
                                fontSize: 13
                            }}>
                            <SaveIcon style={{ marginRight: config.styles.spacing.thin }} />Save
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}