// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';
// import { StyleFunctionProps } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  components: {
    Box: {
      baseStyle: {
        color: PRI_TEXT_COLOR,
      },
    },
  },
});

export default theme;
