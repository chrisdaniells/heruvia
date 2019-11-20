import _ from '@lib/herulib';

import config from '@config';
import { StoreTimelineActions } from '@enums';

export function getTimeline() {
    return {
        type: StoreTimelineActions.getTimeline,
        payload: _.file.getFileJson(config.paths.timeline + 'timeline.json'),
    }
}