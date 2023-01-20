import React from 'react';
import { Button, SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { t } from 'i18next';
import { downloadBase64File } from '../../utils/helpers';
import { SEC_TEXT_COLOR, TEXT_PURPLE } from '../../constants/styles';
import InputCustomV2 from '../Controls/InputCustomV2';
import { messages } from '../../containers/KYCVerifyTalentPage/messages';
const TalentRewardDocs = ({ rewards }) => {
  const renderedRewards = () => {
    if (!rewards) return;
    // eslint-disable-next-line consistent-return
    return rewards.map(reward => (
      <SimpleGrid mb={2} columns={2} spacing={2}>
        <InputCustomV2 value={reward.scoreTypeName} />
        <Button
          variant="primary"
          bg={TEXT_PURPLE}
          color={SEC_TEXT_COLOR}
          onClick={() => handleDownload(reward.achievement)}
        >
          {t(messages.download())}
        </Button>
      </SimpleGrid>
    ));
  };

  const handleDownload = async key => {
    await downloadBase64File(key);
  };
  return renderedRewards();
};

TalentRewardDocs.propType = {
  rewards: PropTypes.array,
};

export default TalentRewardDocs;
