import { createMuiTheme } from '@material-ui/core/styles';

import config from '@config';

export default createMuiTheme({
    palette: {
        primary: {
            main: config.styles.colours.primary
        },
        secondary: {
            main: config.styles.colours.secondary
        }
    },
    typography: {
        fontFamily: 'Calibri, sans-serif !important',
        // fontFamily: 'Futura, sans-serif !important',
        body2: {
            fontWeight: 300,
        }
    }
});