import React from 'react';

interface IDisplayWrapProps {
    children: any,
    show: boolean,
    display?: 'block' | 'inline-block',
}

export default class DisplayWrap extends React.Component<IDisplayWrapProps, any> {
    constructor(props: IDisplayWrapProps) {
        super(props);
    }
    render() {
        const { show, display } = this.props;
        return (
            <div style={{ display: show ? (display ? display : 'block')  : 'none' }}>
                {this.props.children}
            </div>
        )
    }
}