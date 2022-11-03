import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR, LIGHT_GRAY } from 'constants/styles';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Dropdown = ({ slides }) => (
  <Accordion defaultIndex={[0]} allowMultiple w="100%" bg={LIGHT_GRAY} p="6">
    <AccordionItem sx={{ borderTopWidth: '0' }}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" color={PRI_TEXT_COLOR}>
            Section 1 title
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} color={PRI_TEXT_COLOR}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <h2>
        <AccordionButton color={PRI_TEXT_COLOR}>
          <Box flex="1" textAlign="left">
            Section 2 title
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} color={PRI_TEXT_COLOR}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

Dropdown.propTypes = {
  slides: PropTypes.any,
};
export default Dropdown;
