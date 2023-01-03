import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from '@chakra-ui/react';
import { Box } from '@chakra-ui/core';
import InputCustomV2 from '../Controls/InputCustomV2';
import { SEC_TEXT_COLOR, SUB_BLU_COLOR } from '../../constants/styles';
import trashCan from './assets/ic_delete.svg';
function DynamicInput(props) {
  const [formFields, setFormFields] = useState([{ key: '', value: '' }]);

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = e => {
    e.preventDefault();
    props.setDynamicData(formFields);
  };

  const addFields = () => {
    const object = {
      key: '',
      value: '',
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = index => {
    const data = [...formFields];
    data.splice(index, 1);
    props.setDynamicData(data);
    setFormFields(data);
  };

  return (
    <form onChange={submit}>
      {formFields.map((form, index) => (
        <Box display="flex" height="40px" marginBottom="20px">
          <InputCustomV2
            name="key"
            placeholder="Enter Achievement Name"
            onChange={event => handleFormChange(event, index)}
            value={form.key}
          />
          <Box marginRight="4px" marginLeft="4px" />
          <InputCustomV2
            name="value"
            type="number"
            placeholder="Enter score"
            onChange={event => handleFormChange(event, index)}
            value={form.value}
          />
          <Image
            src={trashCan}
            alt="trash"
            _hover={{ cursor: 'pointer' }}
            onClick={() => removeFields(index)}
          />
        </Box>
      ))}
      <Box width="100%">
        <Button
          onClick={addFields}
          text="Add more"
          template="btn-pri btn-inline"
          variant="primary"
          bg={SEC_TEXT_COLOR}
          color={SUB_BLU_COLOR}
          width="100%"
        >
          +
        </Button>
      </Box>
    </form>
  );
}

DynamicInput.propTypes = {
  setDynamicData: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  setDynamicValid: PropTypes.func,
};

export default DynamicInput;
