import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { getTimeline } from '@store/actions/timelineActions';

import _ from '@lib/herulib';
import config from '@config';

import QuillEditor from '@components/global/QuillEditor';
import Alert, { IAlertProps } from '@components/global/Alert';

import {
    Button,
    Chip,
    Card, CardContent, CardHeader,
    Divider,
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    FormControl,
    IconButton,
    Input, InputLabel,
    List, ListItem, ListItemText,
    TextField,
    Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
    Cancel as CancelIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    Save as SaveIcon,
} from '@material-ui/icons';

import { IEntry, IPage, IStoreState } from '@interfaces';
import { SubCategories, AgeChar } from '@enums';

interface ITimelineAppProps {
    timeline?: any;
    getTimeline?: any;
    wiki?: any;
    location?: any;
}

interface ITimelineAppState {
    newEntry: IEntry;
    editEntry?: IEntry;
    tags: any;
    alert: IAlertProps;
    newEntryExpanded: boolean;
}

const inputStyle = { marginBottom: config.styles.spacing.default };

@connect(
    (store: IStoreState) => {
        return {
            timeline: store.timeline,
            wiki: store.wiki,
        };
    },
    (dispatch: any) => {
        return {
            getTimeline: () => dispatch(getTimeline()),
        }
    }
)
export default class TimelineApp extends React.Component<ITimelineAppProps, ITimelineAppState> {

    constructor(props: ITimelineAppProps, state: ITimelineAppState) {
        super(props, state);

        this.state = {
            newEntry: { ...config.timeline.entry.blankEntry },
            tags: this.props.wiki.pages.map((page: IPage) => {
                return {
                    title: page.title,
                    normalized: _.lang.normalizeString(page.title),
                };
            }),
            alert: { ...config.alert.blankAlert },
            newEntryExpanded: false,
        };

        this.handleQuillFormChange = this.handleQuillFormChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.renderEditForm = this.renderEditForm.bind(this);
        this.renderTimelineList = this.renderTimelineList.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    }

    resetAlert(): void {
        this.setState (state => ({ alert: { ...state.alert, open: false }}),() => {
            // Otherwise text disappears before dialog closes
            setTimeout(() => {
                this.setState(state => ({
                    alert: { ...config.alert.blankAlert }
                }));
            }, 100);
        });
    }

    handleDeleteConfirm(id: number) {
        const updated = this.props.timeline.entries.filter((entry: IEntry) => entry.id !== id);
        _.file.archiveFile(this.props.timeline.entries, 'timeline-' + Date.now() + '.json',  config.paths.timelineArchive);
        _.file.saveFile(updated, config.paths.timeline + 'timeline.json');
        
        this.props.getTimeline();
        this.setState({ alert: { ...config.alert.blankAlert } });
    }

    onDelete(id: number) {
        this.setState({
            alert: {
                open: true,
                title: 'Delete Entry',
                message: 'Are you sure you want to delete this entry?',
                close: { onClose: this.resetAlert, label: 'Cancel' },
                confirm: { onConfirm: () => this.handleDeleteConfirm(id), label: 'Yes' }
            }
        });
    }

    handleQuillFormChange(editor: string, content: string) {
        const parser = new DOMParser();
        const { textContent } = parser.parseFromString(content, 'text/html').documentElement;

        this.setState((state: ITimelineAppState) => {
            const newState = { ...state };

            newState[editor].body = textContent.trim().length > 0 ? content : '';
            return newState;
        });
    }

    // TODO Refactor and cleanup
    onSave(type: 'create' | 'edit') {
        let entry: IEntry;
        let editor: string;
        if (type === 'create') {
            entry = { ...this.state.newEntry };
            entry.id = Date.now();
            editor = 'newEntry';
        } else if (type === 'edit') {
            entry = { ...this.state.editEntry };
            editor = 'editEntry';
        }

        const validation = _.val.Entry(entry);
        if (!validation.status) {
            const messages = validation.data.map(message => <span key={message}>{message}</span>);
            this.setState({
                alert: {
                    open: true,
                    title: 'Error',
                    message: messages,
                    close: {
                        onClose: this.resetAlert,
                        label: 'OK',
                    },
                    confirm: false,
                }
            });
            return;
        }

        _.file.archiveFile(entry, 'timeline-entry-' + entry.date.replace('/', '-') + "-" + Date.now(),  config.paths.timelineArchive);

        let exists = false;
        const updated = this.props.timeline.entries.map((e: IEntry) => {
            if (e.id === entry.id) {
                exists = true;
                return entry;
            } else {
                return e;
            }
        });

        if (!exists) updated.push(entry);

        _.file.saveFile(updated, config.paths.timeline + 'timeline.json');

        this.props.getTimeline();
        this.setState((state: ITimelineAppState) => {
            const newState = { ...state };
            newState[editor] = editor === 'newEntry' ? { ...config.timeline.entry.blankEntry } : undefined;
            newState.newEntryExpanded = editor === 'newEntry' ? !state.newEntryExpanded : state.newEntryExpanded;
            return newState;
        });
    }

    // Use proper enums
    renderEditForm(area: 'create' | 'edit') {
        let editor;
        if (area === 'create') { editor = 'newEntry' }
        else if (area === 'edit') { editor = 'editEntry' }
        else { return }

        return (
            <div>
                <FormControl fullWidth style={inputStyle}>
                    <InputLabel htmlFor={editor + '-date'}>Date</InputLabel>
                    <Input 
                        name={editor + '-date'}
                        value={this.state[editor].date}
                        onChange={(e) => {
                            const value = e.target.value;
                            this.setState((state: ITimelineAppState) => {
                                const newState = { ...state };
                                newState[editor].date = value;
                                return newState;
                            });
                        }}
                    />
                </FormControl>
                <QuillEditor
                    id={editor}
                    value={this.state[editor].body}
                    formStyles={inputStyle}
                    onChange={this.handleQuillFormChange}
                    isFocused={this.state[editor].body.length !== 0}
                    toolbar='inline'
                    placeholder='Event'
                />
                <Autocomplete
                    multiple
                    freeSolo
                    filterSelectedOptions
                    options={this.state.tags.map(option => option.title)}
                    value={this.state[editor].tags}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip
                                key={index}
                                variant='outlined'
                                label={option}
                                style={{ height: 'auto', marginRight: 5 }}
                                onDelete={(_chip) => {
                                    this.setState((state: ITimelineAppState) => {
                                        const newState = { ...state };
                                        newState[editor].tags.splice(index, 1);
                                        return newState;
                                    });
                                }}
                            />
                        ))
                    }
                    onChange={(_event, values) => {
                        this.setState((state: ITimelineAppState) => {
                            const newState = { ...state };
                            newState[editor].tags = values;
                            return newState;
                        });
                    }}
                    renderInput={params => (
                        <TextField {...params} placeholder='Tags' fullWidth />
                      )}
                />
                <Divider style={{ margin: config.styles.spacing.thin + 'px 0' }}/>
                <div style={{ width: '50%', display: 'inline-block' }}>
                    {area === 'edit' &&
                        <IconButton onClick={() => this.onDelete(this.state[editor].id)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </div>
                <div style={{ width: '50%', textAlign: 'right', display: 'inline-block' }}>
                    {area === 'edit' &&
                        <Button 
                            onClick={() => { this.setState({ editEntry: undefined }) }}
                            variant='contained'
                            style={{ 
                                marginRight: config.styles.spacing.thin, 
                                borderRadius: 0,
                                fontSize: 13
                            }}>
                            <CancelIcon style={{ marginRight: config.styles.spacing.thin }} />CANCEL
                        </Button>
                    }
                    <Button 
                        onClick={() => this.onSave(area)}
                        color='secondary'
                        variant='contained'
                        style={{ color: 'white', borderRadius: 0, fontSize: 13 }}>
                        <SaveIcon style={{ marginRight: config.styles.spacing.thin }} />Save
                    </Button>
                </div>
            </div>
        );
    }

    renderTimelineList(age: AgeChar) {
        const filtered = _.cal.sortByDate(_.cal.filterEntriesByAge(this.props.timeline.entries, age));
        const list = [];

        filtered.forEach((entry: IEntry, key: number) => {
            if (this.state.editEntry!== undefined && this.state.editEntry.id === entry.id) {
                list.push(
                    <ListItem
                        key={entry.id}
                        style={{ color: config.styles.colours.text.default, display: 'block' }}
                    >
                        <Divider />
                        <div style={{ margin: config.styles.spacing.default + 'px 0' }}>
                            {this.renderEditForm('edit')}
                        </div>
                        <Divider />
                    </ListItem>
                );
            } else {
                list.push(
                    <ListItem
                        id={entry.date.replace('/', '_')}
                        button dense
                        key={entry.id}
                        style={{ color: config.styles.colours.text.default }}
                    > 
                        <ListItemText
                            disableTypography
                            primary={
                                <React.Fragment>
                                    <Typography variant='h6' color='textPrimary'>{entry.date}</Typography>
                                </React.Fragment>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography component ='div' color='textPrimary'>
                                        <div className='entry-description'>{ReactHtmlParser(entry.body)}</div>
                                    </Typography>
                                </React.Fragment>}
                            onClick={() => {
                                this.setState((state: ITimelineAppState) => {
                                    const key = Object.keys(this.props.timeline.entries).find(key => this.props.timeline.entries[key].id === entry.id);
                                    return { editEntry: JSON.parse(JSON.stringify(this.props.timeline.entries[key])) }
                                });
                            }}
                        />
                    </ListItem>
                );
            }
        });

        return <List dense disablePadding>{list}</List>;
    }

    render() {
        return (
            <div style={{ ...config.styles.container, marginTop: 100, }} id='Timeline'>
                <ExpansionPanel
                    square
                    className='u-height-transition'
                    expanded={this.state.newEntryExpanded}
                    onChange={() => this.setState((state: ITimelineAppState) => {
                        return {
                            ...state,
                            newEntryExpanded: !state.newEntryExpanded
                        }
                    })}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id='add-entry'>Add Entry</ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>{this.renderEditForm('create')}</ExpansionPanelDetails>
                </ExpansionPanel>

                <Card square style={{ marginTop: config.styles.spacing.default }}>
                    <CardHeader  title={SubCategories.TheAgeOfCreation} className='Timeline_Title' />
                    <CardContent>{this.renderTimelineList(AgeChar.TheAgeOfCreation)}</CardContent>
                </Card>

                <Card square style={{ marginTop: config.styles.spacing.default }}>
                    <CardHeader title={SubCategories.TheAgeOfRaces} className='Timeline_Title' />
                    <CardContent>{this.renderTimelineList(AgeChar.TheAgeOfRaces)}</CardContent>
                </Card>

                <Card square style={{ marginTop: config.styles.spacing.default }}>
                    <CardHeader title={SubCategories.TheAgeOfEmpires} className='Timeline_Title' />
                    <CardContent>{this.renderTimelineList(AgeChar.TheAgeOfEmpires)}</CardContent>
                </Card>

                <Card square style={{ marginTop: config.styles.spacing.default }}>
                    <CardHeader title={SubCategories.TheAgeOfUncertainty} className='Timeline_Title' />
                    <CardContent>{this.renderTimelineList(AgeChar.TheAgeOfUncertainty)}</CardContent>
                </Card>

                <Card square style={{ margin: config.styles.spacing.default + 'px 0' }}>
                    <CardHeader title={SubCategories.TheAgeOfAwakening} className='Timeline_Title' />
                    <CardContent>{this.renderTimelineList(AgeChar.TheAgeOfAwakening)}</CardContent>
                </Card>
                <Alert
                    open={this.state.alert.open}
                    title={this.state.alert.title}
                    message={this.state.alert.message}
                    close={this.state.alert.close}
                    confirm={this.state.alert.confirm}
                />
            </div>
        )
    }
}