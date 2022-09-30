import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Link,
} from '@chakra-ui/react';
import PackagesBox from 'components/PackageBox';
import { PRI_TEXT_COLOR, RED_COLOR, LIGHT_GRAY } from 'constants/styles';
import PropTypes from 'prop-types';
import * as Paths from 'constants/routes';
import { NumberedCart, CartIcon } from '../Icon';
import { NumWrapper } from './Wrapper';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Cart = ({ data }) => (
  <Menu onCloseSelect={false}>
    <MenuButton>
      {/* <Cart /> */}
      {data.length > 0 ? (
        <>
          <NumberedCart />
          <NumWrapper>{data.length}</NumWrapper>
        </>
      ) : (
        <CartIcon />
      )}
    </MenuButton>
    <MenuList
      minWidth="240px"
      bg={LIGHT_GRAY}
      h="30rem"
      overflow="auto"
      zIndex={999}
    >
      <MenuGroup>
        <MenuItem _hover={{ bg: 'none' }}>
          <PackagesBox />
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuItem _hover={{ bg: 'none' }}>
          <PackagesBox />
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuItem _hover={{ bg: 'none' }}>
          <Link href={Paths.ROUTE_PRECHECKOUT} style={{ width: '100%' }}>
            <Button
              w="100%"
              bg={RED_COLOR}
              color={PRI_TEXT_COLOR}
              _hover={{ bg: 'orange' }}
              href="/checkout"
            >
              Thanh toán
            </Button>
          </Link>
        </MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
);

Cart.propTypes = {
  data: PropTypes.array,
};
export default Cart;
