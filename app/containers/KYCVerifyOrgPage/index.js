import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import {
  Box,
  chakra,
  Stack,
  Avatar,
  FormControl,
  Button,
  SimpleGrid,
  FormLabel,
  Image,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { H1 } from 'components/Elements';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import InputCustomV2 from '../../components/Controls/InputCustomV2';
import { QWERTYEditor } from '../../components/Controls';
import example from './image/example.png';
import {
  LIGHT_ORANGE,
  PRI_TEXT_COLOR,
  SUB_BLU_COLOR,
  TEXT_GREEN,
} from '../../constants/styles';
import { messages } from './messages';
import Metadata from '../../components/Metadata';
import { makeSelectOrg } from './selectors';
import { loadOrgInfo } from './actions';
import PageSpinner from '../../components/PageSpinner';
import { globalMessages } from '../App/globalMessage';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'KYCVerifyOrgPage';
export function KYCVerifyOrgPage({ organizerInfo, loadOrganizer, match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const organizerId = match.params.id;

  useEffect(() => {
    loadOrganizer(organizerId);
  }, [organizerId]);

  useEffect(() => {}, []);

  const onSubmit = async () => {};

  const onCancel = async () => {};

  return (
    <>
      <Metadata />
      <H1 color={TEXT_GREEN} fontSize="30px">
        KYC Verification
      </H1>
      {organizerInfo ? (
        <SimpleGrid
          width="100%"
          sx={{
            justifyContent: 'center',
          }}
          display="flex"
        >
          <Box
            color={PRI_TEXT_COLOR}
            bg={SUB_BLU_COLOR}
            width="700px"
            sx={{
              marginTop: '10px',
              borderRadius: '5px',
            }}
            px="112px"
            py="74px"
          >
            <form>
              <Stack spacing="1">
                <Box textAlign="center">
                  <Avatar
                    size="2xl"
                    src="https://bit.ly/sage-adebayo"
                    borderColor="transparent"
                    showBorder
                  />
                </Box>
                <Box textAlign="center">{t(messages.avatar())}</Box>
                <FormControl>
                  <CustomFormLabel>{t(messages.type())}</CustomFormLabel>
                  <InputCustomV2
                    id="type"
                    size="md"
                    value={
                      t(globalMessages[organizerInfo.accountType]) ||
                      'No information'
                    }
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.companyName())}</CustomFormLabel>
                  <InputCustomV2
                    id="companyName"
                    type="text"
                    size="md"
                    value={organizerInfo.companyName || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.displayName())}</CustomFormLabel>
                  <InputCustomV2
                    id="displayName"
                    type="text"
                    size="md"
                    value={organizerInfo.displayName || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.phoneNumber())}</CustomFormLabel>
                  <InputCustomV2
                    id="phoneNumber"
                    type="tel"
                    size="md"
                    value={organizerInfo.phoneNumber || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.representative())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="representative"
                        type="text"
                        size="md"
                        value={organizerInfo.representative || 'No information'}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.position())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="position"
                        type="text"
                        size="md"
                        value={organizerInfo.position || 'No information'}
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.street())}</CustomFormLabel>
                  <InputCustomV2 id="street" type="text" size="md" />
                </FormControl>
                <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.district())}
                      </CustomFormLabel>
                      <InputCustomV2 id="district" size="md" />
                    </Box>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.province())}
                      </CustomFormLabel>
                      <InputCustomV2 id="province" size="md" />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel htmlFor="introduce">
                    {t(messages.introduce())}
                  </CustomFormLabel>
                  <QWERTYEditor
                    name="introduce"
                    id="introduce"
                    required
                    val="Pass the variant prop to change the visual appearance of the input component. Chakra UI input variant types are: outline, filled, flushed and unstyled"
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>
                    {t(messages.accountNameOwner())}
                  </CustomFormLabel>
                  <InputCustomV2
                    id="accountNameOwner"
                    type="text"
                    size="md"
                    value={organizerInfo.bankAccountOwner || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.accountNumber())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="accountNumber"
                        type="text"
                        size="md"
                        value={
                          organizerInfo.bankAccountNumber || 'No information'
                        }
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.bankName())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="bankName"
                        size="md"
                        value={organizerInfo.bankName || 'No information'}
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.cccd())}</CustomFormLabel>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <Image
                        src={example}
                        borderRadius="5px"
                        height="127px"
                        width="100%"
                      />
                    </Box>
                    <Box>
                      <Image
                        src={example}
                        borderRadius="5px"
                        height="127px"
                        width="100%"
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
              </Stack>
            </form>
          </Box>
          <Box
            sx={{
              marginTop: '10px',
              borderRadius: '5px',
              marginLeft: '20px',
            }}
          >
            <Box
              sx={{
                marginBottom: '10px',
              }}
            >
              <Button
                bg={TEXT_GREEN}
                color={SUB_BLU_COLOR}
                type="submit"
                width="196px"
                onClick={onSubmit}
              >
                {t(messages.approve())}
              </Button>
            </Box>
            <Box>
              <Button
                bg={LIGHT_ORANGE}
                color={SUB_BLU_COLOR}
                type="submit"
                width="196px"
                onClick={onCancel}
              >
                {t(messages.cancel())}
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
      ) : (
        <PageSpinner />
      )}
    </>
  );
}

KYCVerifyOrgPage.propTypes = {
  match: PropTypes.object,
  loadOrganizer: PropTypes.func,
  organizerInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  organizerInfo: makeSelectOrg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadOrganizer: organizerId => {
      dispatch(loadOrgInfo(organizerId));
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
)(KYCVerifyOrgPage);
