import { createMuiTheme } from '@material-ui/core';

import { colors } from './colors';

export const theme = {
  default: createMuiTheme({
    typography: {
      h1: {
        fontWeight: 700,
        fontSize: 36,
        margin: '1rem 0',
      },
      h2: {
        fontWeight: 400,
        fontSize: '2rem',
      },
      button: {
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: 700,
      },
      h3: {
        fontSize: 49,
        lineHeight: '52px',
        color: colors.DEEP_OCEAN,
      },
      h4: {
        fontSize: 16,
        fontWeight: 400,
        color: colors.BLACK2,
        marginTop: 20,
      },
      h6: {
        fontSize: 20,
        lineHeight: '32px',
        fontWeight: 400,
      },
      htmlFontSize: 10,
      allVariants: {
        fontFamily: 'Raleway, sans-serif',
      },
    },
    palette: {
      background: {
        default: colors.WHITE,
      },
      primary: {
        main: colors.TEAL_DARK,
        light: colors.DARK_GREY,
      },
      secondary: {
        main: colors.BLACK,
      },
    },
  }),
};