import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Box,
  Link,
  Divider,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR, LIGHT_GRAY, PRI_BACKGROUND } from 'constants/styles';
import NotificationBox from './NotificationBox';
import { NotificationIcon } from '../Icon';
import { NumWrapper } from './Wrapper';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Notification = () => (
  <Menu onCloseSelect={false}>
    <MenuButton>
      <NotificationIcon />
      {/* <NumWrapper>{1}</NumWrapper> */}
    </MenuButton>
    <MenuList
      minWidth="240px"
      bg={LIGHT_GRAY}
      h="30rem"
      overflow="auto"
      zIndex={999}
      pt={0}
    >
      <MenuGroup>
        <MenuItem
          bg={PRI_BACKGROUND}
          w="100%"
          h="100%"
          _hover={{ bg: PRI_BACKGROUND }}
        >
          <Box as="h1" color={PRI_TEXT_COLOR} fontSize="24px" m="0.4rem">
            Notification
          </Box>
          <Link
            href="https://google.com"
            right="1rem"
            position="absolute"
            borderBottom="1px solid #F7FAFC"
            fontWeight={400}
          >
            <Box as="span" color={PRI_TEXT_COLOR}>
              Mark all as read
            </Box>
          </Link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuItem _hover={{ bg: 'black' }}>
          <NotificationBox />
        </MenuItem>
        <Divider w="88%" ml="auto" mr="auto" my="1rem" />
      </MenuGroup>
      <MenuGroup>
        <MenuItem>
          <NotificationBox />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
);

Notification.propTypes = {};
export default Notification;
