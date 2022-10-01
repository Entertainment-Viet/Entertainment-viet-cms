import React, { useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import { HStack, Text, Box, VStack, Container } from '@chakra-ui/react';
import { PRI_TEXT_COLOR } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import Button from 'components/Buttons';
import {
  getResStatus,
  cacthError,
  cacthResponse,
  numberWithCommas,
} from 'utils/helpers';
import { post } from 'utils/request';
import { GoogleMap, Phone } from '../Icon';
import { messages } from './messages';

const PackageModal = props => {
  console.log(props.data.jobDetail ? props.data.jobDetail.note : null);
  let jobDetail;
  if (props.data.jobDetail) {
    // eslint-disable-next-line prefer-destructuring
    jobDetail = props.data.jobDetail;
  }
  const { t } = useTranslation();
  function handleAddToCart() {
    post(
      `/api/talents/${props.talentId}/packages/${
        props.id
      }/bookings/shoppingcart`,
    )
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
            <HStack align="flex-start">
              <Box bg="orange" w={4} h={4} />
              <Container>
                <Box color={PRI_TEXT_COLOR} as="h1" fontSize="18px">
                  {props.data.name}
                </Box>
                <Box as="span" color="gray.500">
                  {jobDetail ? jobDetail.category.name : null}
                </Box>
              </Container>
            </HStack>
            <Text>{t(messages.orgInfo())}</Text>
            <HStack>
              <GoogleMap />
              <Container>
                <Text>Thời gian biểu diễn</Text>
                {/* <Link href="https://goo.gl/maps/mXySHagWZn7XxGJz5"> */}
                <Box as="span" color="red">
                  {t(messages.googleMap())}
                </Box>
                {/* </Link> */}
              </Container>
            </HStack>
            <HStack>
              <Phone />
              <Container>
                <Text>Giá tiền</Text>
                <Box as="span" color="gray.500">
                  {jobDetail
                    ? `${numberWithCommas(
                      jobDetail.price.min,
                    )} VND - ${numberWithCommas(jobDetail.price.max)} VND`
                    : null}
                </Box>
              </Container>
            </HStack>
            <Text>{t(messages.postDesc())}</Text>
            <Box as="span" color="gray.500">
              {jobDetail ? jobDetail.note : null}
            </Box>
            {/* <Link href="/" alignSelf="flex-end"> */}
            <Button color={PRI_TEXT_COLOR} onClick={() => handleAddToCart()}>
              {t(messages.goToDetail())}
            </Button>
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

export default PackageModal;
