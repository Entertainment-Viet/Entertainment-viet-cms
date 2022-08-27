// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';

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
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);

export default theme;
