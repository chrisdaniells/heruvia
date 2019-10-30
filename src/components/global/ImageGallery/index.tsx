import React from 'react';

import config from '@config';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@material-ui/core';

interface IImageGalleryProps {
    images: string[],
    selectedImage?: string;
    open?: boolean;
}

interface IImageGalleryState {
    selectedImage: string;
    open: boolean;
}

export default class ImageGallery extends React.Component<any, any> {

    constructor(props: any, state: any) {
        super(props, state);

        this.state = {
            selectedImage: this.props.selectedImage ? this.props.selectedImage : '',
            open: this.props.open ? this.props.open : false,
        }

        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderImagePreviews = this.renderImagePreviews.bind(this);
    }

    handleImageClick(image: string) {
        this.setState({
            selectedImage: image,
            open: true,
        });
    }

    handleToggle(direction: string) {
        const selectedImage = this.state.selectedImage;

        const i = this.props.images.indexOf(this.state.selectedImage);
        let k = 0;

        switch(direction) {
            case 'prev':
                if (i === 0) {
                    k = this.props.images.length -1;
                } else {
                    k = i-1;
                }
                break;
            case 'next':
                if (i === this.props.images.length - 1) {
                    k = 0;
                } else {
                    k = i+1
                }
                break;
        }

        this.setState(state => ({
            selectedImage: this.props.images[k],
        }));
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }

    renderImagePreviews() {
        const imagePreviews: any[] = [];

        this.props.images.forEach(image => {
            imagePreviews.push(
                <div className='heruvia-thumbnail' key={image}>
                    <img src={config.paths.images + image} onClick={() => this.handleImageClick(image)} />
                </div>
            )
        });

        return imagePreviews;
    }

    render() {
        return (
            <div style={{
                border: '1px solid ' + config.styles.colours.line,
                padding: config.styles.spacing.default
            }}>
                {this.renderImagePreviews()}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullScreen
                >
                    <DialogContent style={{ textAlign: 'center' }}>
                        <img 
                            src={config.paths.images + this.state.selectedImage}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {this.props.images.length > 1 && 
                            <div>
                                <Button onClick={() => this.handleToggle('prev')}>
                                    Previous
                                </Button>
                                <Button onClick={() => this.handleToggle('next')}>
                                    Next
                                </Button>
                            </div>
                        }
                        <Button onClick={this.handleClose} color='primary'>
                            Close
                        </Button>
                        
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}