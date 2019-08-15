import React from 'react';

interface IDisplayWrapProps {
    children: any,
    show: boolean,
    display?: 'block' | 'inline-block',
    style?: { [key: string] : string | number }
}

export default class DisplayWrap extends React.Component<IDisplayWrapProps, any> {
    style: { [key: string] : string | number };

    constructor(props: IDisplayWrapProps) {
        super(props);

        this.style = this.props.style !== undefined ? this.props.style : {};
    }
    render() {
        const { show, display } = this.props;
        return (
            <div style={{ ...this.style, display: show ? (display ? display : 'block')  : 'none' }}>
                {this.props.children}
            </div>
        )
    }
}