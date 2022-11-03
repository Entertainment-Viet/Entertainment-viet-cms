import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import isValid from 'utils/validator';
import styled from 'styled-components';
import { messages } from './messages';
import { Control, Wrapper } from './styles';

const Input = styled.input`
  ${Control};
  &::placeholder {
    color: #9f9acb;
  }
  color: #14142b;
  font-size: 18px;
  line-height: 19px;
`;

const Validation = styled.div`
  width: 100%;
  font-size: 0.75rem;
  text-align: left;
  margin: 0 auto;
  color: rgb(255, 0, 0, 0.5);
  position: absolute;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.25rem 0.5rem !important;
`;

const InputWrapper = styled(Wrapper)`
  &.inp-s > ${Validation} {
    display: none;
  }
  &.inp-l > ${Validation} {
    margin-top: -0.5rem;
  }
`;
function InputCustom(props) {
  const {
    val,
    name,
    type,
    message,
    template,
    disabled,
    novalidate,
    isError,
    clear,
    isChange,
    pressKey,
  } = props;
  const { t } = useTranslation();

  const [inputError, setInputError] = useState('');
  const [inputValue, setInputValue] = useState(
    val !== undefined ? val : inputValue || '',
  );
  // Clear value
  if (clear && inputValue) {
    if (type === 'number') {
      setInputValue(0);
    } else {
      setInputValue('');
    }
  }
  const handleKeypress = e => {
    if (e.charCode === 13) {
      // Call Back
      pressKey ? pressKey() : '';
    }
  };

  const handleInputChange = event => {
    let mValue = event.target.value;
    let mType = type;
    let mError = '';

    if (mValue && !novalidate) {
      if (
        type === 'text' &&
        ['last_name', 'first_name', 'full_name'].includes(name)
      ) {
        mType = 'name';
      }
      if (!isValid(mType, mValue)) {
        mError = messages[mType];
      }
      if (type === 'price') {
        mValue = Intl.NumberFormat('de-DE')
          .format(
            parseInt(
              mValue.length == 0
                ? '0'
                : /^[0-9.,]+$/.test(mValue)
                  ? mValue.replaceAll('.', '')
                  : mValue.replaceAll('[^0-9].,', '').replaceAll('.', ''),
            ),
          )
          .toString();
        mValue = mValue === 'NaN' ? '0' : mValue;
      }
    } else if (props.required && !mValue) {
      mError = t(messages.required());
    }
    if (!mValue) {
      if (mValue.length === 0) {
        setInputValue('0');
      }
    }

    setInputError(mError);
    setInputValue(mValue);
    // Call Back
    isError ? isError(mError) : '';
    isChange ? isChange(mValue) : '';
  };
  useEffect(() => {
    if (val) {
      setInputValue(val);
    }
  }, [val]);

  let content = (
    <Input
      {...props}
      type={type === 'price' ? 'text' : type}
      onChange={handleInputChange}
      onKeyPress={handleKeypress}
      value={inputValue}
    />
  );
  if (message) {
    content = (
      <Input
        {...props}
        type={type === 'price' ? 'text' : type}
        onChange={handleInputChange}
        onKeyPress={handleKeypress}
        value={inputValue}
        placeholder={t(messages[message]())}
      />
    );
  }
  return (
    <InputWrapper className={template + (disabled ? ' disabled' : '')}>
      {content}
      {inputError && <Validation>(*) {t(messages.required())}</Validation>}
    </InputWrapper>
  );
}

InputCustom.propTypes = {
  template: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  required: PropTypes.bool,
};

export default InputCustom;
