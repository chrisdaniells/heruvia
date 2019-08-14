import React from 'react';

import { SearchApiClient, WikiApiClient } from '@api';

import config from '@config';


interface IWikiAppProps {
    SearchApiClient: SearchApiClient;
    WikiApiClient: WikiApiClient;
}

export default class WikiApp extends React.Component<IWikiAppProps, any> {
    constructor(props: IWikiAppProps, state: any) {
        super(props, state);
    }

    render() {
        return (
            <div 
                style={{
                    ...config.styles.container,
                    marginTop: 100,
                }}>Hello</div>
        )
    }
}