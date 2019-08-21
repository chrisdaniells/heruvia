import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'

interface IAlertProps {
    open: boolean;
    title?: string;
    message?: string;
    onClose(): void;
}

interface IAlertState {
}

export default class Alert extends React.Component<IAlertProps, IAlertState> {
    constructor(props: IAlertProps, state: IAlertState) {
        super(props, state);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {this.props.title.length > 0 &&
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                }
                {this.props.message.length > 0 &&
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.message}
                        </DialogContentText>
                    </DialogContent>
                }
                <DialogActions>
                <Button onClick={this.props.onClose} color="primary">
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}