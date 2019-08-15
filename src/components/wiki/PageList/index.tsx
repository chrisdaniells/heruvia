import React from 'react';
import { Link } from 'react-router-dom';

import { WikiApiClient } from '@api';

import config from '@config';

interface IPageListProps {
    pages: any[],
}

export default class PageList extends React.Component<IPageListProps, any> {
    constructor(props: IPageListProps, state: any) {
        super(props);

        this.renderPageList = this.renderPageList.bind(this);
    }
    
    renderPageList() {
        let list: any[] = [];

        this.props.pages.forEach((page: any) => {
            list.push(
                <Link
                    to={config.routes.wiki.page + page.url}
                    key={page.id}
                    style={{
                        display: 'block',
                        color: config.styles.colours.text.default,
                        padding: config.styles.spacing.thin,
                    }}
                    className='u-hover-border'
                >
                    <div style={{
                        display: 'inline-block',
                        float: 'left',
                        width: 80,
                        minHeight: 20,
                    }}>
                        {page.images.main.length > 0 &&
                            <img 
                                src={config.paths.images + page.images.main} 
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    paddingRight: config.styles.spacing.thin,
                                    borderRight: '1px solid ' + config.styles.colours.line,
                                }}
                            />
                        }
                    </div>
                    <div style={{
                        display: 'inline-block',
                        float: 'left',
                        width: 'calc(100% - 100px)',
                        paddingLeft: config.styles.spacing.thin,
                    }}>
                        <p style={{
                            margin: 0,
                            textDecoration: 'underline',
                        }}>{page.title}</p>
                        <p style={{
                            fontSize: 12,
                            margin: config.styles.spacing.thin + 'px 0 0',
                        }}>{WikiApiClient.getReducedPrefaceText(page.preface, 300)}</p>
                    </div>
                    <div style={{ clear: 'both' }} />
                </Link>      
            )
        });

        return list;
    }

    render() {
        return (
            <div style={{ padding: config.styles.spacing.default }}>
                {this.renderPageList()}
            </div>
        )
    }
}