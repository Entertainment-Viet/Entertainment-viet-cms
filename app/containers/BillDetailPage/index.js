import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Box,
  SimpleGrid,
  chakra,
  Text,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import saga from './saga';
import reducer from './reducer';
import {
  PRI_BACKGROUND,
  TEXT_PURPLE,
  SUB_BLU_COLOR,
  TEXT_GREEN,
} from '../../constants/styles';
import { makeSelectCategories } from './selectors';
import { loadCategories } from './actions';

const CustomBox = chakra(Box, {
  baseStyle: {
    backgroundColor: PRI_BACKGROUND,
    marginTop: '1rem',
    // width: '810px',
    borderRadius: '10px',
    py: { base: '0', sm: '12' },
    px: { base: '4', sm: '12' },
  },
});
const Title = chakra(Text, {
  baseStyle: {
    fontWeight: 'bolder',
    display: 'inline-block',
  },
});
const Content = chakra(Text, {
  baseStyle: {
    display: 'inline-block',
  },
});
const key = 'BillDetailPage';

export function BillDetailPage({ match }) {
  const { t } = useTranslation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // getCategories();
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Metadata />
        <GridItem colSpan={2}>
          <CustomBox>
            <Box
              color={TEXT_GREEN}
              fontWeight="600"
              fontSize="25px"
              sx={{
                marginBottom: '25px',
              }}
            >
              Booking Information
            </Box>
            <Box>
              <Title>ID:&nbsp;</Title>
              <Content>abcxyz</Content>
            </Box>
            <Box>
              <Title>Booking Date:&nbsp;</Title>
              <Content>{new Date().toLocaleString()}</Content>
            </Box>
            <Box>
              <Title>Perform Date and Time:&nbsp;</Title>
              <Content>{new Date().toLocaleString()}</Content>
            </Box>
            <Box mt={4}>
              <Title>Talent:&nbsp;</Title>
              <Content>BAO</Content>
            </Box>
            <Box>
              <Title>Talent contact:&nbsp;</Title>
              <Content>09333123123123</Content>
            </Box>
            <Box mt={4}>
              <Title>Organizer:&nbsp;</Title>
              <Content>TANG</Content>
            </Box>
            <Box>
              <Title>Organizer contact:&nbsp;</Title>
              <Content>09333123123123</Content>
            </Box>
            <Box mt={4}>
              <Title>Package:&nbsp;</Title>
              <Content>Premium</Content>
            </Box>
            <Box>
              <Title>Hình thức thanh toán:&nbsp;</Title>
              <Content>Trả trước</Content>
            </Box>
          </CustomBox>
          <CustomBox>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem>
                <Title>Giá tiền:&nbsp;</Title>
              </GridItem>
              <GridItem>
                <Content>Premium</Content>
              </GridItem>
              <GridItem colSpan={3} textAlign="end">
                <Title color={TEXT_GREEN}>$5000</Title>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem>
                <Title>VAT/PIT:&nbsp;</Title>
              </GridItem>
              <GridItem>
                <Content>8%/10%</Content>
              </GridItem>
              <GridItem colSpan={3} textAlign="end">
                <Title color={TEXT_GREEN}>$500</Title>
              </GridItem>
            </Grid>
            <Divider my={4} />
            <SimpleGrid justifyContent="space-between" columns={2}>
              <Title>Total cost:</Title>
              <Title color={TEXT_GREEN} textAlign="end">
                $5500
              </Title>
            </SimpleGrid>
            <Box>
              <Title>Status:&nbsp;</Title>
              <Content color={TEXT_PURPLE}>Đã thanh toán</Content>
            </Box>
          </CustomBox>
        </GridItem>
      </Grid>
    </>
  );
}

BillDetailPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      dispatch(loadCategories());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BillDetailPage);
