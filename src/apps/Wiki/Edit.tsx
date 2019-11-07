import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { SearchApiClient, WikiApiClient } from '@api';
import { IPage, IDetailsItem } from '@interfaces';
import config from '@config';

import QuillEditor from '@components/global/QuillEditor';
import DetailsInputList from '@components/wiki/DetailsInputList';
import Alert, { IAlertProps } from '@components/global/Alert';

import {
    Button, IconButton,
    Card, CardHeader, CardActions, CardContent,
    FormControl, Input, InputLabel,
    MenuItem, Select,
} from '@material-ui/core';
import {
    ArrowBack as BackIcon,
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
    location?: any;
}

interface IEditState {
    page: IPage | null;
    quillFocus: string | null;
    alert: IAlertProps
}

const inputStyle = {
    marginBottom: config.styles.spacing.default
}

export default class Edit extends React.Component<IEditProps, IEditState> {
    constructor(props: IEditProps, state: IEditState) {
        super(props, state);

        let page: IPage = JSON.parse(JSON.stringify(this.props.WikiApiClient.getPageTemplate()));
        let alert: IAlertProps = { open: false, title: '', message: '', close: false, confirm: false };

        if (this.props.match.params.id !== undefined) {
            const pageResponse = this.props.WikiApiClient.getPageById(this.props.match.params.id);
            if (pageResponse.status) {
                page = pageResponse.data;
                if (!config.wiki.categories.hasOwnProperty(page.category)) {
                    page.category = '',
                    page.subcategory ='';
                } else if (!config.wiki.categories[page.category].includes(page.subcategory)) {
                    page.subcategory = '';
                }
            } else {
                alert = {
                    open: true,
                    title: 'Page Not Found',
                    message: 'The page you are looking for has not been found.',
                    close: {
                        onClose: this.resetAlert,
                        label: "OK",
                    },
                    confirm: false,
                };
            }
        } else if (this.props.location.search.length) {
            const parsed = queryString.parse(this.props.location.search);
            if (parsed.template) {
                page = this.props.WikiApiClient.getPageTemplate(parsed.template as string);
            }
            if (parsed.create) {
                page.title = this.props.WikiApiClient.getPageTitleFromId(parsed.create as string);
            }
        }

        this.state = {
            page,
            quillFocus: null,
            alert,
        };

        this.resetAlert = this.resetAlert.bind(this);
        this.handleQuillFocus = this.handleQuillFocus.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleDetailsFormChange = this.handleDetailsFormChange.bind(this);
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

    resetAlert(): void {
        this.setState (state => ({
            alert: { ...state.alert, open: false }
        }),() => {
            // Otherwise text disappears before dialog closes
            setTimeout(() => {
                this.setState(state => ({
                    alert: {
                        ...state.alert,
                        title: '',
                        message: '',
                        close: false,
                        confirm: false,
                    }
                }));
            }, 100);
        });
    }

    handleQuillFocus(editor: string | null = null) {
        this.setState((state: any) => ({ quillFocus: state.quillFocus !== editor ? editor : null }));
    }

    handleKeyDown(e: any) {
        if (!(e.key === 's' && e.ctrlKey)) return true;
        e.preventDefault();
        this.handleSave();
        return false;
    }

    handleDeleteConfirm() {
        this.props.WikiApiClient.deletePageById(this.state.page.id);
        this.props.history.push({ pathname: config.routes.wiki.root });
        location.reload(true);
    }

    handleFormChange(e: any) {
        const { name, value } = e.target;
        let page = { ...this.state.page };
        page[name] = value;
        this.setState({ page });
    }

    handleDetailsFormChange(details: IDetailsItem[]) {
        let page = { ...this.state.page };
        page.details = details;
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

        const filepaths = Object.keys(files).map((key: number | string) => { return files[key].path });
        const uploads = this.props.WikiApiClient.uploadImages(filepaths);

        if (!uploads.status) return;
        
        switch(name) {
            case "main-image":
                page.images.main = uploads.data[0];
                break;
            case "other-images":
                page.images.other = [ ...page.images.other, ...uploads.data ];
                break;
        }
        this.setState({ page });
    }

    handleDelete() {
        this.setState({
            alert: {
                open: true,
                title: 'Delete Page',
                message: 'Are you sure you want to delete this page?',
                close: { onClose: this.resetAlert, label: "Cancel" },
                confirm: { onConfirm: this.handleDeleteConfirm, label: "Yes" }
            }
        });
    }

    handleSave() {
        const validation = this.props.WikiApiClient.validatePage(this.state.page);

        if (!validation.status) {
            const messages = validation.data.map(message => {
                return <span key={message}>{message}</span>;
            });
            this.setState({
                alert: {
                    open: true,
                    title: 'Validation Errors',
                    message: messages,
                    close: {
                        onClose: this.resetAlert,
                        label: 'OK',
                    },
                    confirm: false,
                }
            });
        } else {
            this.props.WikiApiClient.updatePage(this.state.page, this.state.page.id.length === 0);
            this.props.history.push({ 
                pathname: config.routes.wiki.page + '/' + this.props.WikiApiClient.getPageIdFromTitle(this.state.page.title)
            });
        }
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
                            src={config.paths.images + '/' + this.state.page.images.main}
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
        let otherImages: any[] = [];
        this.state.page.images.other.forEach((image, index) => {
            otherImages.push(
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            verticalAlign: 'top',
                            marginRight: config.styles.spacing.thin,
                            marginBottom: config.styles.spacing.thin,
                        }}
                        >
                        <img
                            src={config.paths.images + '/' + image} 
                            style={{ width: 'auto', height: 150 }} 
                        />
                        <IconButton 
                            onClick={() => {
                                let page = { ...this.state.page };
                                page.images.other.splice(index, 1);
                                this.setState({ page });
                            }}
                            className="Wiki_IconOverlayBlend"
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: '44%',
                                bottom: 0,
                                margin: '0 auto',
                                display: 'block',
                                transform: 'translateY(-50%)',
                                height: 48,
                                width: 48,
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
            );
        });

        return(
            <div>
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
                    <ImageIcon style={{ marginRight: config.styles.spacing.thin }}/>Add Additional Images
                    <input
                        accept='image/*'
                        multiple
                        name='other-images'
                        type='file'
                        style={{ display: 'none' }}
                        onChange={(e) => { this.handleImageUpload(e) }}
                    />
                </Button>
                <div>{otherImages}</div>
            </div>
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
        let categoryItems: any[] = [];
        let subcategoryItems: any[] = [];
        for (let category in config.wiki.categories) {
            if (!config.wiki.categories.hasOwnProperty(category)) continue;
            categoryItems.push(
                <MenuItem
                    key={category}
                    value={category}
                    style={{ textTransform: 'capitalize' }}
                >{category}</MenuItem>
            );
        }
        if (this.state.page.category.length > 0) {
            config.wiki.categories[this.state.page.category].forEach(subcategory => {
                subcategoryItems.push(
                    <MenuItem 
                        key={subcategory}
                        value={subcategory}
                        style={{ textTransform: 'capitalize' }}
                    >{subcategory}
                    </MenuItem>);
            });
        }

        return  (
            <div>
                <FormControl fullWidth style={inputStyle}>
                    <InputLabel htmlFor='category'>Category</InputLabel>
                    <Select
                        value={this.state.page.category}
                        onChange={(e) => { this.handleFormChange(e) }}
                        inputProps={{ name: 'category' }}
                        style={{ textTransform: 'capitalize' }}
                    >
                        <MenuItem 
                            value=''
                            style={{ color: config.styles.colours.text.faint }}
                        >Select Category</MenuItem>
                        {categoryItems}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={inputStyle}>
                    <InputLabel htmlFor='subcategory'>Subcategory</InputLabel>
                    <Select
                        value={this.state.page.subcategory}
                        onChange={(e) => { this.handleFormChange(e) }}
                        inputProps={{ name: 'subcategory' }}
                        style={{ textTransform: 'capitalize' }}
                        disabled={this.state.page.category.length === 0}
                    >
                        <MenuItem value='' style={{ color: config.styles.colours.text.faint }}>
                            Select Subcategory
                        </MenuItem>
                        {subcategoryItems}
                    </Select>
                </FormControl>
            </div>
        );
    }

    renderFormDetails() {
        return <DetailsInputList details={this.state.page.details} onAdd={this.handleDetailsFormChange} />
    }

    renderFormQuill(editor: string, formats?: string[]) {
        const isFocused = this.state.quillFocus === editor || this.state.page[editor as string].length !== 0;
        return (
            <QuillEditor
                id={editor}
                value={this.state.page[editor]}
                formStyles={inputStyle}
                isFocused={isFocused}
                formats={formats !== undefined ? formats : undefined}
                onChange={this.handleQuillFormChange}
                onFocus={this.handleQuillFocus}
                onBlur={this.handleQuillFocus}
            />
        );
    }

    render() {
        return(
            <div style={{ ...config.styles.container, marginTop: 100 }}>
                <Card square style={{ marginBottom: config.styles.spacing.default }}>
                    <CardHeader
                        action={
                            <div>
                                <IconButton onClick={this.props.history.goBack}><BackIcon /></IconButton>
                                <IconButton component={Link} to={config.routes.wiki.root}><HomeIcon /></IconButton>
                            </div>
                        }
                        title='Page Creator'
                    />
                    <CardContent style={{ padding: config.styles.spacing.default }}>
                        {this.renderFormMainImage()}
                        {this.renderFormTitle()}
                        {this.renderFormCategorySubcategory()}
                        {this.renderFormDetails()}
                        {this.renderFormQuill('preface')}
                        {this.renderFormQuill('body')}
                        {this.renderFormOtherImages()}
                    </CardContent>
                    <CardActions style={{ marginBottom: config.styles.spacing.default }}>
                        { this.state.page.id.length > 0 &&
                            <IconButton onClick={this.handleDelete}><DeleteIcon /></IconButton>
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
                <Alert
                    open={this.state.alert.open}
                    title={this.state.alert.title}
                    message={this.state.alert.message}
                    close={this.state.alert.close}
                    confirm={this.state.alert.confirm}
                />
            </div>
        );
    }
}