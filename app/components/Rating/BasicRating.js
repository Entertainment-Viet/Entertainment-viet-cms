/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Icon, Stack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const BasicRating = React.forwardRef(
  ({ size, scale, fillColor, strokeColor, setRating, rating }, ref) => {
    // const [rating, setRating] = useState(0);
    const buttons = [];

    const onClick = idx => {
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
        }
      }
    };

    const RatingIcon = ({ fill }) => (
      <Icon
        as={StarIcon}
        size={`${size}px`}
        color={fillColor}
        stroke={strokeColor}
        onClick={onClick}
        fillOpacity={fill ? '100%' : '0'}
      />
    );

    const RatingButton = ({ idx, fill }) => (
      <Box
        as="button"
        aria-label={`Rate ${idx}`}
        height={`${size}px`}
        width={`${size}px`}
        variant="unstyled"
        mx={1}
        onClick={() => onClick(idx)}
        _focus={{ outline: 0 }}
      >
        <RatingIcon fill={fill} />
      </Box>
    );

    for (let i = 1; i <= scale; i += 1) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline mt={8} justify="center" style={{ margin: '0 auto' }}>
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
      </Stack>
    );
  },
);

BasicRating.displayName = 'Rating';

export default BasicRating;
