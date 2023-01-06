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
  useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAnimation } from 'framer-motion';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';
import placeholder from './assets/placeholder.png';
import PageSpinner from '../../components/PageSpinner';
import NotificationProvider from '../../components/NotificationProvider';

import {
  PRI_BACKGROUND,
  TEXT_PURPLE,
  SUB_BLU_COLOR,
  TEXT_GREEN,
} from '../../constants/styles';
import { makeSelectData } from './selectors';
import { loadData } from './actions';
import { API_UPDATE } from '../../constants/api';
import { put, sendFileToAWS } from '../../utils/request';

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

export function BookingDetailPage({ match, data, getData }) {
  const toast = useToast();
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };

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
  const [fileProof, setFileProof] = useState(null);
  const [urlProof, setUrlProof] = useState(placeholder);
  const bookingId = match.params.id;
  const myId = localStorage.getItem('uid');
  useEffect(() => {
    getData(bookingId);
  }, []);

  const handleUploadProofImg = item => {
    if (item) {
      console.log(item);
      setFileProof(item);
      setUrlProof(URL.createObjectURL(item));
    }
  };

  const onSubmit = async () => {
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
    let fileCode = '';
    if (fileProof) {
      fileCode = await sendFileToAWS(fileProof, true);
    }
    put(
      API_UPDATE,
      { finishProof: [fileCode], isPaid: data.isPaid },
      myId,
      bookingId,
    ).then(res => {
      if (res > 300) {
        notify('Thêm thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
        return;
      }
      notify('Thêm thành công');
    });
  };

  return (
    <>
      {!data ? (
        <PageSpinner />
      ) : (
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
                  <Content>{data.bookingCode}</Content>
                </Box>
                <Box>
                  <Title>Booking Date:&nbsp;</Title>
                  <Content>{new Date(data.createdAt).toLocaleString()}</Content>
                </Box>
                <Box>
                  <Title>Perform Date and Time:&nbsp;</Title>
                  <Content>
                    {new Date(
                      data.jobDetail.performanceStartTime,
                    ).toLocaleString()}{' '}
                    -{' '}
                    {new Date(
                      data.jobDetail.performanceEndTime,
                    ).toLocaleString()}
                  </Content>
                </Box>
                <Box mt={4}>
                  <Title>Talent:&nbsp;</Title>
                  <Content>{data.talentName}</Content>
                </Box>
                {/* <Box>
                <Title>Talent contact:&nbsp;</Title>
                <Content>09333123123123</Content>
              </Box> */}
                <Box mt={4}>
                  <Title>Organizer:&nbsp;</Title>
                  <Content>{data.organizerName}</Content>
                </Box>
                {/* <Box>
                <Title>Organizer contact:&nbsp;</Title>
                <Content>09333123123123</Content>
              </Box> */}
                <Box mt={4}>
                  <Title>Package:&nbsp;</Title>
                  <Content>{data.packageName && data.packageName}</Content>
                </Box>
                <Box>
                  <Title>Hình thức thanh toán:&nbsp;</Title>
                  <Content>
                    {data.paymentType === 'payment.offline'
                      ? 'Trả sau'
                      : 'Trả trước'}
                  </Content>
                </Box>
              </CustomBox>
              <CustomBox>
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                  <GridItem>
                    <Title>Giá tiền:&nbsp;</Title>
                  </GridItem>
                  <GridItem>
                    <Content>{data.packageName && data.packageName}</Content>
                  </GridItem>
                  <GridItem colSpan={3} textAlign="end">
                    <Title color={TEXT_GREEN}>
                      ${data.jobDetail.price.min}
                    </Title>
                  </GridItem>
                </Grid>
                {/* <Grid templateColumns="repeat(5, 1fr)" gap={6}>
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
                </SimpleGrid> */}
                <Box>
                  <Title>Status:&nbsp;</Title>
                  <Content color={TEXT_PURPLE}>
                    {data.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    {` lúc ${data.paidAt &&
                      new Date(data.paidAt).toLocaleString()}`}
                  </Content>
                  {/* <Controller
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
                  /> */}
                </Box>
              </CustomBox>
            </GridItem>
            <GridItem>
              <Box position="relative">
                <Image
                  src={data.finishProof ? data.finishProof : urlProof}
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
      )}
    </>
  );
}

BookingDetailPage.propTypes = {
  match: PropTypes.object,
  data: PropTypes.any,
  getData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getData: id => {
      dispatch(loadData(id));
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
