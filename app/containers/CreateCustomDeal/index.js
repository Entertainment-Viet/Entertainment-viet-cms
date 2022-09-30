/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Divider,
  Grid,
  GridItem,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  SimpleGrid,
  Select,
  Textarea,
  InputGroup,
  InputRightElement,
  chakra,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { LIGHT_GRAY, PRI_TEXT_COLOR } from 'constants/styles';
import { H1 } from 'components/Elements';
import { QWERTYEditor, DateTimeCustom } from 'components/Controls';
import FileUploadInput from 'components/FileUploadInput';
import DynamicForm from 'components/DynamicInputForm';
import {
  toIsoString,
  getResStatus,
  redirectTo,
  cacthError,
  cacthResponse,
} from 'utils/helpers';
import { API_CREATE_BOOKING } from 'constants/api';
import { post } from 'utils/request';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';

import {} from 'constants/routes';
import cRequest from 'utils/server';
import { messages } from './messages';
import { loadCategories } from './actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectCategories } from './selectors';
import { UploadInput } from './styles';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});
const CustomDivider = chakra(Divider, {
  baseStyle: {
    mt: '4',
    mb: '6',
  },
});

const key = 'CreateCustomDeal';
export function CreateCustomDealPage({ match, getCategories, categories }) {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const { t } = useTranslation();
  const fileUpload = useRef(null);
  const [file, setFile] = useState(null);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const describeNFTRef = useRef(null);
  const orgId = window.localStorage.getItem('uid');
  useEffect(() => {
    getCategories();
  }, []);

  function onSubmit(values) {
    // console.log('file: ', file);
    const val = {
      // attachment: file,
      organizerUid: orgId,
      talentUid: match.params.id,
      jobDetail: {
        location: getValues('location'),
        note: describeNFTRef.current.getContent(),
        categoryUid: getValues('category'),
        workType: getValues('workType'),
        price: {
          min: getValues('currency'),
          max: getValues('currency'),
          currency: 'currency.vnd',
        },
        performanceStartTime: toIsoString(start),
        performanceEndTime: toIsoString(end),
        performanceCount: 0,
        extensions: 'string',
      },
    };
    post(API_CREATE_BOOKING, val, orgId).then(res1 => {
      const status1 = getResStatus(res1);
      if (status1 === '201') {
        console.log('sent');
      } else if (status1 === '400') {
        console.log('fail');
      } else {
        cacthResponse(res1);
      }
    });
  }

  return (
    <div>
      <Metadata />
      <H1>{t(messages.createEvent())}</H1>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={3}>
          <Box bg={LIGHT_GRAY} p="8" color={PRI_TEXT_COLOR}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name}>
                <CustomFormLabel htmlFor="location">
                  {t(messages.location())}
                </CustomFormLabel>
                <Input
                  bg="white"
                  id="location"
                  color="black"
                  placeholder="Địa điểm"
                  {...register('location', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
                <CustomFormLabel htmlFor="description">
                  {t(messages.desc())}
                </CustomFormLabel>
                <QWERTYEditor
                  ref={describeNFTRef}
                  name="description"
                  id="description"
                  required
                  // {...register('description')}
                />
              </FormControl>
              <FileUploadInput />
              <UploadInput
                type="file"
                ref={fileUpload}
                onChange={e => setFile(e.target.files[0])}
              />
              <CustomDivider />
              <SimpleGrid columns={2} spacing={2}>
                <Box>
                  <CustomFormLabel htmlFor="category">
                    {t(messages.category())}
                  </CustomFormLabel>
                  <Select
                    placeholder="Select option"
                    {...register('category')}
                    color="black"
                    bg="white"
                  >
                    {categories
                      ? categories.map(item => (
                          <option value={item.uid}>{item.name}</option>
                        ))
                      : null}
                  </Select>
                </Box>
                <Box>
                  <CustomFormLabel htmlFor="subcategory">
                    {t(messages.workType())}
                  </CustomFormLabel>
                  <Select
                    placeholder="Select option"
                    {...register('workType')}
                    color="black"
                    bg="white"
                  >
                    <option value="work.type.single-time">Single time</option>
                    <option value="work.type.single-show">Single show</option>
                    <option value=" work.type.period-contract">
                      Single contract
                    </option>
                  </Select>
                </Box>
              </SimpleGrid>
              <CustomDivider />
              <CustomFormLabel htmlFor="currency">
                {t(messages.currency())}
              </CustomFormLabel>
              <InputGroup>
                <Input
                  bg="white"
                  id="currency"
                  color="black"
                  placeholder="currency"
                  type="number"
                  {...register('currency', {
                    required: 'This is required',
                    valueAsNumber: true,
                    validate: value => value > 10000,
                  })}
                />
                <InputRightElement>
                  <Box color={LIGHT_GRAY}>VND</Box>
                </InputRightElement>
              </InputGroup>
              <Box>
                <CustomFormLabel htmlFor="start">
                  {t(messages.startDate())}
                </CustomFormLabel>
                <DateTimeCustom
                  template="datetime-picker right"
                  name="end_vip_date"
                  type="hm"
                  message="Start date"
                  handleDateChange={setStart}
                />
              </Box>
              <Box>
                <CustomFormLabel htmlFor="end">
                  {t(messages.endDate())}
                </CustomFormLabel>
                <DateTimeCustom
                  template="datetime-picker right"
                  name="end_vip_date"
                  type="hm"
                  message="End date"
                  handleDateChange={setEnd}
                />
              </Box>
              <CustomDivider />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                {t(messages.submit())}
              </Button>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

CreateCustomDealPage.propTypes = {
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
)(CreateCustomDealPage);
