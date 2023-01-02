import React, { memo } from 'react';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import {
  Tab,
  TabList,
  Tabs,
  chakra,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';
import { H1 } from 'components/Elements';
import { messages } from './messages';

import Org from './Org';
import Talent from './Talent';
import AllBookings from './AllBookings';
// import Orders from './Orders';

export function ManagementPage() {
  const CustomTab = chakra(Tab, {
    baseStyle: {
      fontWeight: '500',
      fontSize: '18px',
      _hover: { color: TEXT_GREEN },
      _focus: { color: TEXT_PURPLE },
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <H1 color={TEXT_GREEN} fontSize="30px">
        Business Development control space
      </H1>
      <Tabs mb="12" isLazy>
        <TabList color={TEXT_PURPLE}>
          {/* <CustomTab>{t(messages.achievement())}</CustomTab> */}
          <CustomTab>{t(messages.allBookings())}</CustomTab>
          <CustomTab>{t(messages.orgTab())}</CustomTab>
          <CustomTab>{t(messages.talentTab())}</CustomTab>
          {/* <CustomTab>By customer</CustomTab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllBookings />
          </TabPanel>
          <TabPanel>
            <Org />
          </TabPanel>
          <TabPanel>
            <Talent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

ManagementPage.propTypes = {};

export default compose(memo)(ManagementPage);
