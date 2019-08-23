import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'

export interface IAlertProps {
    open: boolean;
    title?: string;
    message?: string;
    close: {
        onClose: any;
        label: string;
    } | false;
    confirm: {
        onConfirm: any;
        label: string;
    } | false;    
}

interface IAlertState {
}

export default class Alert extends React.Component<IAlertProps, IAlertState> {
    constructor(props: IAlertProps, state: IAlertState) {
        super(props, state);
    }

    render() {
        if (!this.props.close) return null;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.close.onClose}
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
                {this.props.confirm &&
                    <Button onClick={this.props.confirm.onConfirm}>
                        {this.props.confirm.label}
                    </Button>
                }
                <Button onClick={this.props.close.onClose} color="primary">
                    {this.props.close.label}
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}