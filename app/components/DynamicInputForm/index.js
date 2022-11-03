/* eslint-disable no-unused-expressions */
/**
 *
 * Form
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { GridView, ControlView } from 'components/Viewers';
import { ButtonCustom } from 'components/Controls';
import styled, { css } from 'styled-components';
import { SimpleGrid } from '@chakra-ui/react';

const Control = css`
  background: #eff0f6;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #1c1c28;
  letter-spacing: 0.75px;

  padding: 12px 24px;
  border-radius: 12px;

  border: 0px;
  width: 100%;

  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  ${Control};
  &::placeholder {
    color: #9f9acb;
  }
  color: #14142b;
`;
function DynamicForm(props) {
  const [formFields, setFormFields] = useState([{ key: '', value: '' }]);
  const obj = {};

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = e => {
    e.preventDefault();
    for (let i = 0; i < formFields.length; i += 1) {
      obj[formFields[i].key] = formFields[i].value;
      for (let j = 0; j < formFields.length; j += 1) {
        if (formFields[j].key === formFields[i].key && i !== j) {
          props.setDynamicValid(false);
        }
      }
    }
    props.setDynamicData(obj);
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
    setFormFields(data);
  };

  return (
    <form onChange={submit}>
      {formFields.map((form, index) => (
        <SimpleGrid columns="3" spacing={2}>
          <Input
            name="key"
            placeholder="Key"
            onChange={event => handleFormChange(event, index)}
            value={form.key}
          />
          <Input
            name="value"
            placeholder="Value"
            onChange={event => handleFormChange(event, index)}
            value={form.value}
          />
          <ButtonCustom
            onClick={() => removeFields(index)}
            text="Remove"
            template="btn-pri btn-inline"
          >
            Remove
          </ButtonCustom>
        </SimpleGrid>
      ))}
      <br />
      <ButtonCustom
        onClick={addFields}
        text="Add more"
        template="btn-pri btn-inline"
      >
        Add More..
      </ButtonCustom>
    </form>
  );
}

DynamicForm.propTypes = {
  setDynamicData: PropTypes.func,
  setDynamicValid: PropTypes.func,
};

export default DynamicForm;
