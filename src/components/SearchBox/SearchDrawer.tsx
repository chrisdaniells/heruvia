import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { SwipeableDrawer } from '@material-ui/core';

const styles = makeStyles({
    root: {
        top: "49px !important",
        zIndex: 1099
    },
    paper: {
        marginTop: 49,
    },
    backdrop: { 
        top: 49
    },
});

export default function SearchDrawer(props: any) {
    const {
        open, 
        results,
        onClose,
        onOpen,
    } = props; 
    const classes = styles({});

    return (
        <SwipeableDrawer
            open={open}
            anchor="top"
            onClose={onClose}
            onOpen={onOpen}
            style={{
                zIndex: 1099
            }}
            classes={{
                root: classes.root,
                paper: classes.paper,
            }}
            ModalProps={{
                disableAutoFocus: true,
                disableEnforceFocus: true,
                BackdropProps: {
                    classes: {
                        root: classes.backdrop,
                    }
                }
            }}
        >
            {results}
        </SwipeableDrawer>
    );
}