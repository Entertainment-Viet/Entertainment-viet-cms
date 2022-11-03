import React from 'react';
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Link,
  Box,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { PRI_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import {
  TermOfService,
  Safety,
  Categories,
  Partner,
  Career,
  Support,
  About,
  Buyer,
} from '../../Icon';

export default function DropdownItem({ title, active, navSize, data }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Accordion
          color={active && TEXT_GREEN}
          py={3}
          _hover={{ textDecor: 'none', color: TEXT_GREEN }}
          w={navSize === 'large' && '100%'}
          allowMultiple
        >
          <AccordionItem
            style={{ borderTopWidth: '0', borderBottomWidth: '0' }}
          >
            <h2>
              <AccordionButton>
                <MenuButton
                  w="100%"
                  border={
                    navSize === 'small' && active && `2px solid ${TEXT_GREEN}`
                  }
                  borderRadius={navSize === 'small' && active && '5px'}
                  p={navSize === 'small' && active && '0.5rem'}
                >
                  <Flex alignItems="center">
                    <HeaderIconSidebar
                      title={title}
                      isActive={active ? TEXT_GREEN : PRI_TEXT_COLOR}
                    />
                    <Text
                      ml={5}
                      mt={2}
                      display={navSize === 'small' ? 'none' : 'flex'}
                      color={active ? TEXT_GREEN : PRI_TEXT_COLOR}
                      fontSize="30px"
                    >
                      {title}
                    </Text>
                  </Flex>
                </MenuButton>
                {navSize === 'large' && <AccordionIcon />}
              </AccordionButton>
            </h2>
            {navSize === 'large' && (
              <AccordionPanel pb={4} color={PRI_TEXT_COLOR} ml={12}>
                <VStack alignItems="flex-start">
                  {data &&
                    data.map(value => (
                      <Link
                        href={
                          value.uid
                            ? `/search?category=${value.uid}`
                            : `/${value.url}`
                        }
                        key={value.url}
                      >
                        <Flex>
                          <i style={{ marginTop: '2px', marginRight: '5px' }}>
                            <BodyIconAbout name={value.name} iconSize={20} />
                          </i>
                          <Box
                            color={PRI_TEXT_COLOR}
                            fontWeight="700"
                            as="h1"
                            fontSize="xl"
                            whiteSpace="nowrap"
                            noOfLines={1}
                            key={`header_${value.url}`}
                          >
                            <Flex>
                              <i
                                style={{
                                  marginTop: '2px',
                                  marginRight: '5px',
                                }}
                              >
                                <BodyIconSupport
                                  name={value.name}
                                  iconSize={20}
                                />
                              </i>
                              <Box
                                color={PRI_TEXT_COLOR}
                                fontWeight="500"
                                as="h1"
                                fontSize="xl"
                                whiteSpace="nowrap"
                                noOfLines={1}
                                key={`title_${value.url}`}
                              >
                                {value.name}
                              </Box>
                            </Flex>
                          </Box>
                        </Flex>
                      </Link>
                    ))}
                </VStack>
              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      </Menu>
    </Flex>
  );
}

const BodyIconAbout = ({ name, iconSize }) => {
  switch (name) {
    case 'News & Announcement':
      return <HiOutlineNewspaper size={iconSize} />;
    case 'Privacy policy':
      return <MdOutlinePrivacyTip size={iconSize} />;
    case 'Terms of Service':
      return <TermOfService size={iconSize} />;
    case 'Partnership':
      return <Partner size={iconSize} />;
    case 'Career':
      return <Career size={iconSize} />;
    default:
      return null;
  }
};
const BodyIconSupport = ({ name, iconSize }) => {
  switch (name) {
    case 'Become Talent':
      return <AiOutlineStar />;
    case 'Help & Support':
      return <BiSupport />;
    case 'FAQ':
      return <FiHelpCircle />;
    case 'Trust & Safety':
      return <Safety size={iconSize} />;
    case 'Become Buyer':
      return <Buyer size={iconSize} />;
    default:
      return null;
  }
};
const HeaderIconSidebar = ({ title, isActive }) => {
  switch (title) {
    case 'About':
      return <About isActive={isActive} size={20} />;
    case 'Support':
      return <Support isActive={isActive} size={20} />;
    case 'Categories':
      return <Categories isActive={isActive} size={20} />;
    default:
      return null;
  }
};
HeaderIconSidebar.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
BodyIconSupport.propTypes = {
  name: PropTypes.string,
  iconSize: PropTypes.number,
};
BodyIconAbout.propTypes = {
  name: PropTypes.string,
  iconSize: PropTypes.number,
};

DropdownItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.any,
  navSize: PropTypes.any,
  data: PropTypes.any,
};
