import * as React from 'react';

// Use Chakra Ui for create a custom component for display field data in table
import { Box, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

// Recommended for icons
import { FiTrash2, FiUser } from 'react-icons/fi';

import { Table } from 'react-chakra-pagination';
import './styles.css';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

export default function MyTable({ columns, data, title }) {
  // Control current Page
  const [page, setPage] = React.useState(1);
  const { t } = useTranslation();

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        {title}
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            icon: FiUser,
            text: 'No data is available',
          }}
          totalRegisters={data.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={p => setPage(p)}
          columns={columns}
          data={data}
          styles={{ border: '1px solid' }}
        />
      </Box>
    </Box>
  );
}

MyTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  title: PropTypes.string,
};
