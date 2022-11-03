import React, { useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import {
  HStack,
  Text,
  Box,
  VStack,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  chakra,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import Button from 'components/Buttons';
import {
  getResStatus,
  cacthError,
  cacthResponse,
  numberWithCommas,
} from 'utils/helpers';
import { useForm } from 'react-hook-form';
import { put } from 'utils/request';
import {
  API_GET_BOOKING_TALENT_INFO,
  API_GET_BOOKING_ORG_INFO,
} from 'constants/api';
import { messages } from './messages';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const AcceptOfferModal = props => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const { t } = useTranslation();
  const id = window.localStorage.getItem('uid');
  const role = window.localStorage.getItem('role');
  function onSubmit() {
    // console.log('file: ', file);
    const val = {
      // attachment: file,
      jobDetail: {
        price: {
          max: getValues('max'),
          min: props.data.jobDetail.price.min,
          currency: 'currency.vnd',
        },
      },
    };
    if (role === 'talent')
      put(API_GET_BOOKING_ORG_INFO, val, id, props.data.uid)
        .then(res => {
          const status = getResStatus(res);
          if (status === 200) {
            console.log(res.data);
          } else if (status === 400) {
            console.log('error while logging out 400');
          } else if (status === 500) {
            console.log('error while logging out 500');
          } else {
            cacthResponse(res);
          }
        })
        .catch(err => cacthError(err));
    else if (role === 'organizer')
      put(API_GET_BOOKING_TALENT_INFO, val, id, props.data.uid)
        .then(res => {
          const status = getResStatus(res);
          if (status === 200) {
            console.log(res.data);
          } else if (status === 400) {
            console.log('error while logging out 400');
          } else if (status === 500) {
            console.log('error while logging out 500');
          } else {
            cacthResponse(res);
          }
        })
        .catch(err => cacthError(err));
  }

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [props]);

  useLayoutEffect(() => {}, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="modal"
        onClick={props.onClose}
        onKeyPress={closeOnEscapeKeyDown}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          onKeyPress={closeOnEscapeKeyDown}
        >
          <VStack align="flex-start" p={4} spacing={4}>
            <HStack />
            <HStack />

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.suggestedPrice}>
                <CustomFormLabel htmlFor="suggestedPrice">
                  Giá đề nghị
                </CustomFormLabel>
                <Input
                  bg="white"
                  id="max"
                  color="black"
                  placeholder="Mức giá"
                  {...register('max', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.suggestedPrice && errors.suggestedPrice.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                color={PRI_TEXT_COLOR}
                // onClick={() => handleAddToCart()}
                isLoading={isSubmitting}
                type="submit"
              >
                Feedback offer
              </Button>
            </form>
            {/* </Link> */}
          </VStack>
          <div className="modal-footer" />
        </div>
      </div>
    </CSSTransition>,
    // @ts-ignore
    document.getElementById('app'),
  );
};

export default AcceptOfferModal;
