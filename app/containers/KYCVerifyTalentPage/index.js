import React, { useState, useEffect, memo } from 'react';
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
  useToast,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { H1 } from 'components/Elements';
import { getFileFromAWS, del, post, put } from 'utils/request';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import InputCustomV2 from '../../components/Controls/InputCustomV2';
import example from './image/example.png';
import {
  LIGHT_ORANGE,
  PRI_TEXT_COLOR,
  SUB_BLU_COLOR,
  TEXT_GREEN,
  TEXT_PURPLE,
} from '../../constants/styles';
import { messages } from './messages';
import Metadata from '../../components/Metadata';
import { makeSelectTalent } from './selectors';
import { loadTalentInfo } from './actions';
import PageSpinner from '../../components/PageSpinner';
import { globalMessages } from '../App/globalMessage';
import { API_TALENT_DETAIL } from '../../constants/api';
import NotificationProvider from '../../components/NotificationProvider';
import TalentRewardDocs from '../../components/TalentRewardDocs';
import useThumbnailImgs from '../../components/ImageUploadInput/useThumbnailImgs';
// import ImageUploadInput from '../../components/ImageUploadInput';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'KYCVerifyTalentPage';
export function KYCVerifyTalentPage({ talentInfo, loadTalent, match }) {
  const [urlAvtar, setUrlAvatar] = useState('https://bit.ly/sage-adebayo');
  const [urlCCCD1, setUrlCCCD1] = useState(example);
  const [urlCCCD2, setUrlCCCD2] = useState(example);
  const toast = useToast();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const talentId = match.params.id;
  const myId = localStorage.getItem('uid');
  const thumbnailComposable = useThumbnailImgs(5);
  useEffect(() => {
    loadTalent(talentId);
  }, []);

  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };

  useEffect(() => {
    if (talentInfo && talentInfo.avatar) {
      getFileFromAWS(talentInfo.avatar).then(res => {
        setUrlAvatar(res);
      });
    }
    if (talentInfo && talentInfo.citizenPaper && talentInfo.citizenPaper[0]) {
      getFileFromAWS(talentInfo.citizenPaper[0]).then(res => {
        setUrlCCCD1(res);
      });
    }
    if (talentInfo && talentInfo.citizenPaper && talentInfo.citizenPaper[1]) {
      getFileFromAWS(talentInfo.citizenPaper[1]).then(res => {
        setUrlCCCD2(res);
      });
    }
    if (talentInfo && talentInfo.descriptionImg) {
      thumbnailComposable.initImagesFromResponse(talentInfo.descriptionImg);
    }
  }, [talentInfo]);

  const onSubmit = async () => {
    post(API_TALENT_DETAIL, { uid: talentId }, myId, talentId).then(res => {
      if (res > 300) {
        notify('Thất bại');
      }
      notify('Thành công');
    });
  };
  const onEditorChoice = async () => {
    put(
      API_TALENT_DETAIL,
      { editorChoice: talentInfo.editorChoice !== true },
      myId,
      talentId,
    ).then(res => {
      if (res > 300) {
        notify('Thất bại');
      }
      notify('Thành công');
    });
  };

  const onCancel = async () => {
    del(API_TALENT_DETAIL, { uid: talentId }, myId, talentId).then(res => {
      if (res > 300) {
        notify('Thất bại');
      }
      notify('Thành công');
    });
  };
  return (
    <>
      <Metadata />
      <H1 color={TEXT_GREEN} fontSize="30px">
        KYC Verification
      </H1>
      {talentInfo ? (
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
                    src={urlAvtar}
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
                      t(globalMessages[talentInfo.userType]) || 'No information'
                    }
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.fullName())}</CustomFormLabel>
                  <InputCustomV2
                    id="fullName"
                    type="text"
                    size="md"
                    value={talentInfo.fullName || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.displayName())}</CustomFormLabel>
                  <InputCustomV2
                    id="displayName"
                    type="text"
                    size="md"
                    value={talentInfo.displayName || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.phoneNumber())}</CustomFormLabel>
                  <InputCustomV2
                    id="phoneNumber"
                    type="tel"
                    size="md"
                    value={talentInfo.phoneNumber || 'No information'}
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.street())}</CustomFormLabel>
                  <InputCustomV2
                    id="street"
                    type="text"
                    size="md"
                    value={
                      talentInfo.address && talentInfo.address.name
                        ? talentInfo.address.name
                        : null
                    }
                  />
                </FormControl>
                <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>{t(messages.street())}</CustomFormLabel>
                      <InputCustomV2
                        id="district"
                        size="md"
                        value={
                          talentInfo.address && talentInfo.address.parent
                            ? talentInfo.address.parent.name
                            : null
                        }
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.province())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="province"
                        size="md"
                        value={
                          talentInfo.address &&
                          talentInfo.address.parent &&
                          talentInfo.address.parent.parent
                            ? talentInfo.address.parent.parent.name
                            : null
                        }
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                {/* <FormControl>
                  <CustomFormLabel htmlFor="introduce">
                    {t(messages.introduce())}
                  </CustomFormLabel>
                  <QWERTYEditor
                    name="introduce"
                    id="introduce"
                    required
                    val="Pass the variant prop to change the visual appearance of the input component. Chakra UI input variant types are: outline, filled, flushed and unstyled"
                  />
                </FormControl> */}
                <FormControl>
                  <CustomFormLabel>
                    {t(messages.accountNameOwner())}
                  </CustomFormLabel>
                  <InputCustomV2
                    id="accountNameOwner"
                    type="text"
                    size="md"
                    value={talentInfo.bankAccountOwner || 'No information'}
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
                        value={talentInfo.bankAccountNumber || 'No information'}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.bankName())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="bankName"
                        size="md"
                        value={talentInfo.bankName || 'No information'}
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.cccd())}</CustomFormLabel>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <Image
                        src={urlCCCD1}
                        borderRadius="5px"
                        height="127px"
                        width="100%"
                      />
                    </Box>
                    <Box>
                      <Image
                        src={urlCCCD2}
                        borderRadius="5px"
                        height="127px"
                        width="100%"
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.yourSong())}</CustomFormLabel>
                  {talentInfo.songs &&
                    talentInfo.songs.map((form, index) => (
                      <Box
                        display="flex"
                        height="40px"
                        marginBottom="20px"
                        key={index.toString()}
                      >
                        <InputCustomV2
                          name="achievement"
                          value={form.achievement}
                        />
                        <Box marginRight="4px" marginLeft="4px" />
                        <InputCustomV2 name="proof" value={form.proof} />
                      </Box>
                    ))}
                </FormControl>
                {/* <FormControl>
                  <CustomFormLabel>
                    {t(messages.imageThumbnails())}
                  </CustomFormLabel>
                  <ImageUploadInput thumbnailComposable={thumbnailComposable} />
                </FormControl> */}
                <FormControl>
                  <CustomFormLabel>{t(messages.yourReward())}</CustomFormLabel>
                  {talentInfo.priorityScores &&
                    talentInfo.priorityScores.map((form, index) => (
                      <Box
                        display="flex"
                        height="40px"
                        marginBottom="20px"
                        key={index.toString()}
                      >
                        <InputCustomV2
                          name="achievement"
                          value={form.scoreTypeName}
                        />
                        <Box marginRight="4px" marginLeft="4px" />
                        <InputCustomV2 name="proof" value={form.achievement} />
                      </Box>
                    ))}
                  {talentInfo && talentInfo.rewards && (
                    <TalentRewardDocs rewards={talentInfo.rewards} />
                  )}
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
            <Box
              sx={{
                marginBottom: '10px',
              }}
            >
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
            <Box>
              <Button
                bg={TEXT_PURPLE}
                color={SUB_BLU_COLOR}
                type="submit"
                width="196px"
                onClick={onEditorChoice}
              >
                {talentInfo.editorChoice === true
                  ? 'Đang quảng cáo'
                  : 'Quảng cáo'}
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

KYCVerifyTalentPage.propTypes = {
  match: PropTypes.object,
  loadTalent: PropTypes.func,
  talentInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  talentInfo: makeSelectTalent(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadTalent: talentId => {
      dispatch(loadTalentInfo(talentId));
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
)(KYCVerifyTalentPage);
