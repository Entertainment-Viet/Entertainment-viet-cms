import React from 'react';
import { Box, Link, HStack } from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';

import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Categories = ({ categories }) => (
  <HStack spacing={4}>
    {categories.length > 0
      ? categories.map(value => (
          <>
            <Link href={`/search?category=${value.uid}`} key={value.uid}>
              <Box
                color={PRI_TEXT_COLOR}
                fontWeight="500"
                as="h1"
                lineHeight="tight"
                noOfLines={1}
                key={`header_${value.url}`}
              >
                {/* {t(messages[value.title]())} */}
                {value.name}
              </Box>
            </Link>
          </>
          // eslint-disable-next-line indent
        ))
      : null}
  </HStack>
);

Categories.propTypes = {
  categories: PropTypes.array,
};
export default Categories;
