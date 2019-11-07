import React from 'react';
import ChipInput from 'material-ui-chip-input'

import * as hcal from '@lib/hcal';

import QuillEditor from '@components/global/QuillEditor';

import {
    Button,
    Card, CardContent, CardHeader,
    Divider,
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    FormControl,
    IconButton,
    Input, InputLabel,
    List, ListItem, ListItemSecondaryAction, ListItemText,
    Typography
} from '@material-ui/core';
import {
    Edit as EditIcon,
    ExpandMore as ExpandMoreIcon,
    Save as SaveIcon,
} from '@material-ui/icons';

import config from '@config';

import { IEntry } from '@interfaces';
import { SubCategories, AgeChar } from '@enums';

interface ITimelineAppProps {

}

interface ITimelineAppState {
    entries: IEntry[];
    currentEntry: IEntry;
    editEntry?: IEntry;
    quillFocus?: string | null;
}

const inputStyle = {
    marginBottom: config.styles.spacing.default
}

export default class TimelineApp extends React.Component<ITimelineAppProps, ITimelineAppState> {

    constructor(props: ITimelineAppProps, state: ITimelineAppState) {
        super(props, state);

        this.state = {
            entries: [
                {
                    id: 1,
                    date: "U4-35-X",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                },
                {
                    id: 2,
                    date: "C4-35-10",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                },
                {
                    id: 3,
                    date: "C4-35-X",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                },
                {
                    id: 4,
                    date: "E4-35-X",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                },
                {
                    id: 5,
                    date: "R4-35-X",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                },
                {
                    id: 6,
                    date: "R4-35-X",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                },
                {
                    id: 7,
                    date: "U4-35-X",
                    body: "Some text here",
                    tags: ["Me", "You", "Everybody"],
                }

            ],
            currentEntry: {
                id: 0,
                date: "",
                body: "",
                tags: [],
            }
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleQuillFormChange = this.handleQuillFormChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.renderEditForm = this.renderEditForm.bind(this);
        this.renderTimelineList = this.renderTimelineList.bind(this);
    }

    handleFormChange(e: any) {
        const { name, value } = e.target;
        let currentEntry = { ...this.state.currentEntry };
        currentEntry[name] = value;
        this.setState({ currentEntry });
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

    handleSave() {

    }

    renderEditForm(area: "create" | "edit") {
        let editor;
        if (area === "create") {
            editor = "currentEntry";
        } else if (area === "edit") {
            editor = "editEntry";
        } else {
            return;
        }

        return (
            <div>
                <FormControl fullWidth style={inputStyle}>
                    <InputLabel htmlFor='date'>Date</InputLabel>
                    <Input 
                        name='date'
                        value={this.state[editor].date}
                        onChange={(e) => { this.handleFormChange(e) }}
                    />
                </FormControl>
                <QuillEditor
                    id={editor}
                    value={this.state[editor].body}
                    formStyles={inputStyle}
                    onChange={this.handleQuillFormChange}
                    isFocused={this.state[editor].body.length !== 0}
                    toolbar="inline"
                />
                <ChipInput
                    value={this.state[editor].tags}
                    onAdd={(chip) => {
                        this.setState((state: ITimelineAppState) => {
                            const newState = { ...state };
                            newState[editor].tags.push(chip);
                            return newState;
                        });
                    }}
                    onDelete={(_chip, index) => {
                        this.setState((state: ITimelineAppState) => {
                            const newState = { ...state };
                            newState[editor].tags.splice(index, 1);
                            return newState;
                        });
                    }}  
                    placeholder="Tags"
                />
                <Divider style={{ margin: config.styles.spacing.thin + "px 0" }}/>
                <div style={{ textAlign: "right" }}>
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
                        <SaveIcon style={{ marginRight: config.styles.spacing.default }} />Save
                    </Button>
                </div>
            </div>
        );
    }

    renderTimelineList(age: AgeChar) {
        const filtered = hcal.filterEntriesByAge(this.state.entries, age);

        const list = [];

        filtered.forEach((entry: IEntry, key: number) => {
            if (this.state.editEntry!== undefined && this.state.editEntry.id === entry.id) {
                list.push(
                    <ListItem
                        dense key={entry.id}
                        style={{
                            color: config.styles.colours.text.default
                        }}
                    >
                        <Divider />
                        {this.renderEditForm("edit")}
                        <Divider />
                    </ListItem>
                );
            } else {
                list.push(
                    <ListItem
                        button dense key={entry.id}
                        style={{
                            color: config.styles.colours.text.default
                        }}
                    > 
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Typography component='span' variant='h6' color='textPrimary'>{entry.date}</Typography>
                                </React.Fragment>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography component='span' variant='body2' color='textPrimary'>{entry.body}</Typography>
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge='end'
                                onClick={() => {
                                    this.setState((state: ITimelineAppState) => {
                                        const key = Object.keys(state.entries).find(key => state.entries[key].id === entry.id);
                                        return {
                                            editEntry: state.entries[key],
                                        }
                                    });
                                }}
                            ><EditIcon /></IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            }
        });

        return(
            <List dense disablePadding>
                {list}
            </List>
        );
    }

    render() {
        console.log(this.state);
        return (
            <div style={{ ...config.styles.container, marginTop: 100, }}>
                <ExpansionPanel
                    square
                    className='u-height-transition'
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="add-entry"
                    >Add Entry
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: "block" }}>
                        {this.renderEditForm("create")}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Card style={{ marginTop: config.styles.spacing.default }}>
                    <CardHeader 
                        title={SubCategories.TheAgeOfCreation}
                        className="Timeline_Title"
                    />
                    <CardContent>
                        {this.renderTimelineList(AgeChar.TheAgeOfCreation)}
                    </CardContent>
                </Card>
            </div>
        )
    }
}