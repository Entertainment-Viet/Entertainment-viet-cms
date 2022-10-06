import React, { memo } from 'react';
import {
  Container,
  VStack,
  HStack,
  Text,
  Progress,
  SimpleGrid,
  Button,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import CommentBox from 'components/Comment';
import { H1 } from 'components/Elements';
import PropTypes from 'prop-types';
import { StarIcon } from '@chakra-ui/icons';
import { messages } from '../../messages';

const Review = ({ data, match }) => {
  const { t } = useTranslation();
  return (
    <VStack align="flex-start">
      <SimpleGrid columns={2}>
        <H1 color={TEXT_PURPLE}>Reviews</H1>
      </SimpleGrid>
      <Box display="flex" ml="2" alignItems="center">
        <Text as="h1" fontWeight={700} color={TEXT_PURPLE}>
          120 Reviews{'    '}
        </Text>
        <StarIcon color={TEXT_GREEN} ml={2} />
        <Box
          as="span"
          mx={2}
          color={TEXT_GREEN}
          fontSize="18px"
          fontWeight={700}
        >
          4
        </Box>
      </Box>
      <HStack>
        <Text>5 sao</Text> <Progress value={50} size="xs" w="20rem" />
        <Text>100</Text>
      </HStack>
      <HStack>
        <Text>4 sao</Text> <Progress value={50} size="xs" w="20rem" />
        <Text>100</Text>
      </HStack>
      <HStack>
        <Text>3 sao</Text> <Progress value={50} size="xs" w="20rem" />
        <Text>100</Text>
      </HStack>
      <HStack>
        <Text>2 sao</Text> <Progress value={50} size="xs" w="20rem" />
        <Text>100</Text>
      </HStack>
      <HStack>
        <Text>1 sao</Text> <Progress value={50} size="xs" w="20rem" />
        <Text>100</Text>
      </HStack>
      <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
        Review
      </Text>
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <Container>
        <Button color={TEXT_GREEN} fontSize="18px" variant="ghost">
          {t(messages.seeMore())}
        </Button>
      </Container>
    </VStack>
  );
};

Review.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
export default memo(Review);
