// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { PRI_TEXT_COLOR, LIGHT_GRAY } from 'constants/styles';

// import { StyleFunctionProps } from '@chakra-ui/theme-tools';

const theme = extendTheme(
  {
    colors: {
      primary: {
        main: PRI_TEXT_COLOR,
      },
    },
    components: {
      Text: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
      Input: {
        baseStyle: {
          field: {
            bg: 'white',
            ':focus': {
              bg: 'white',
            },
          },
        },
        sizes: {},
        variants: {},
        defaultProps: {
          variant: null,
        },
      },
      Button: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
      FormLabel: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
      Select: {
        baseStyle: {
          field: {
            bg: 'white',
          },
        },
        defaultProps: {
          variant: null,
        }
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);

export default theme;
