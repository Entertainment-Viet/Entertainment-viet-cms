import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Box,
  SimpleGrid,
  chakra,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
  Image,
  Input,
  Checkbox,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAnimation } from 'framer-motion';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { toIsoString, getResStatus, cacthResponse } from 'utils/helpers';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import { post } from 'utils/request';
import { H1 } from 'components/Elements';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';
import placeholder from './assets/placeholder.png';
import InputCustomV2 from '../../components/Controls/InputCustomV2';
import SelectCustom from '../../components/Controls/SelectCustom';
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
const key = 'BookingDetailPage';

export function BookingDetailPage({ match }) {
  const { t } = useTranslation();
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [fileProof, setFileProof] = useState({});
  const [urlProof, setUrlProof] = useState(placeholder);

  useEffect(() => {
    // getCategories();
  }, []);

  const handleUploadProofImg = item => {
    if (item) {
      setFileProof(item);
      setUrlProof(URL.createObjectURL(item));
    }
  };

  const onSubmit = async data => {
    // const talentId = window.localStorage.getItem('uid');
    // const val = {
    //   name: getValues('name'),
    //   jobDetail: {
    //     categoryId: getValues('category'),
    //     workType: getValues('workType'),
    //     price: {
    //       min: getValues('min'),
    //       max: getValues('max'),
    //       currency: 'currency.vnd',
    //     },
    //     note: describeNFTRef.current.getContent(),
    //     location: getValues('location'),
    //     performanceStartTime: toIsoString(start),
    //     performanceEndTime: toIsoString(end),
    //     performanceCount: 0,
    //     extensions: 'string',
    //   },
    // };
    console.log(data);
    console.log(fileProof);
    // post(API_GET_PACKAGE_INFO, val, talentId).then(res1 => {
    //   const status1 = getResStatus(res1);
    //   if (status1 === '201') {
    //     // console.log('ok')
    //   } else if (status1 === '400') {
    //     // console.log('error')
    //   } else {
    //     cacthResponse(res1);
    //   }
    // });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <Controller
                  control={control}
                  name="isPaid"
                  key="isPaid"
                  defaultValue={false}
                  render={({ field: { onChange, value, ref } }) => (
                    <Checkbox
                      onChange={onChange}
                      textTransform="capitalize"
                      ref={ref}
                      isChecked={value}
                    >
                      Is paid ?
                    </Checkbox>
                  )}
                />
              </Box>
            </CustomBox>
          </GridItem>
          <GridItem>
            <Box position="relative">
              <Image
                src={urlProof}
                borderRadius="5px"
                height="75vh"
                width="100%"
              />
              <Input
                type="file"
                top="0"
                left="0"
                opacity="0"
                onDragEnter={startAnimation}
                onDragLeave={stopAnimation}
                position="absolute"
                width="100%"
                height="75vh"
                onChange={e => handleUploadProofImg(e.target.files[0])}
              />
            </Box>
          </GridItem>
        </Grid>
        <Box display="flex" justifyContent="end">
          <Button
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: '20px',
              marginBottom: '100px',
              background: TEXT_GREEN,
              width: '235px',
              height: '48px',
            }}
            color={SUB_BLU_COLOR}
            type="submit"
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}

BookingDetailPage.propTypes = {
  match: PropTypes.object,
  getCategories: PropTypes.func,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
)(BookingDetailPage);
