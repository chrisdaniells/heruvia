import { createMuiTheme } from '@material-ui/core/styles';

import config from '@config';

export default createMuiTheme({
    palette: {
        primary: {
            main: config.styles.colours.primary
        },
    },
    typography: {
        fontFamily: 'Lora',
    }
});