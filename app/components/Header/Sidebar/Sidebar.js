import React, { useState, useEffect } from 'react';
import { Flex, Text, Divider, Image } from '@chakra-ui/react';
import { FiHome, FiCalendar, FiUser } from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
import cRequest from 'utils/server';
import { getResStatus, cacthError, cacthResponse } from 'utils/helpers';
import NavItem from './NavItem';
import VE from '../assets/Entertainment Viet.svg';
import EV from '../assets/EV.svg';
import DropdownItem from './DropdownItem';
import { HeaderData } from '../HeaderData';

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('small');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    cRequest
      .get('/api/categories')
      .then(res => {
        const status = getResStatus(res);
        if (status === 200) {
          setCategories(res.data);
        } else if (status === 400) {
          console.log('error while logging out 400');
        } else if (status === 500) {
          console.log('error while logging out 500');
        } else {
          cacthResponse(res);
        }
      })
      .catch(err => cacthError(err));
  }, []);
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      w={navSize === 'small' ? '75px' : '400px'}
      flexDir="column"
      justifyContent="space-between"
      onMouseEnter={() => {
        changeNavSize('large');
      }}
      onMouseLeave={() => {
        changeNavSize('small');
      }}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <Image src={navSize === 'small' ? EV : VE} alt="Viet Entertainment" />

        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Home"
          description="This is the description for the dashboard."
        />
        <DropdownItem
          navSize={navSize}
          icon={FiCalendar}
          title="Categories"
          active
          data={categories}
        />
        <DropdownItem
          navSize={navSize}
          icon={FiUser}
          title="About"
          data={HeaderData}
        />
        <DropdownItem navSize={navSize} icon={IoPawOutline} title="Support" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize === 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          {navSize === 'large' ? (
            <Text as="span">Entertainment Viet Ltd. 2022</Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}
