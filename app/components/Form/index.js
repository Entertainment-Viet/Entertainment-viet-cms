/**
 *
 * Form
 *
 */

import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/LoadingIndicator';
import Wrapper from './Wrapper';
import WrapperLoading from './WrapperLoading';

function Form(props) {
  const { children } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmit(true);

    const res = props.mySubmit ? props.mySubmit(e) : '';

    if (res) {
      try {
        res.finally(() => setIsSubmit(false));
      } catch (err) {
        throw err;
      }
    } else {
      setIsSubmit(false);
    }

    // setTimeout(() => {
    //   setIsSubmit(false);
    // }, 3000);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} noValidate>
        {Children.toArray(children)}
        {isSubmit ? (
          <WrapperLoading>
            <Loading />
          </WrapperLoading>
        ) : (
          ''
        )}
      </form>
    </Wrapper>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;
