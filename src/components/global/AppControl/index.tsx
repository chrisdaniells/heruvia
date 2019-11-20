import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { IStoreState } from '@interfaces';

import { getPages } from '@store/actions/wikiActions';
import { getTimeline } from '@store/actions/timelineActions';

@connect(
  (_store: IStoreState) => {
      return {};
  },
  (dispatch: any) => {
      return {
          getPages: () => dispatch(getPages()),
          getTimeline: () => dispatch(getTimeline()),
      }
  }
)
class ScrollToTop extends React.Component<any, any> {
    constructor(props: any, state: any) {
        super(props);

        this.hydrateStore = this.hydrateStore.bind(this);
        this.hydrateStore();
    }

    hydrateStore() {
      this.props.getPages();
      this.props.getTimeline();
    }

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.hydrateStore();

        const parsed = queryString.parse(this.props.location.search);
        if (parsed.scroll) {
          document.getElementById(parsed.scroll as string).scrollIntoView(true);
        } else {
          window.scrollTo(0, 0);
        }   
      }
    }
  
    render() {
      return this.props.children;
    }
  }
  
  export default withRouter(ScrollToTop)