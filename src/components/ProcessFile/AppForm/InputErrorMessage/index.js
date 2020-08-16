import React from 'react';
import { FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';

const InputErrorMessage = props => {
  const { error, touched } = props;
  return (
    <FormHelperText error={error && touched}>
      {error && touched ? error : ''}
      &nbsp;
    </FormHelperText>
  );
};

InputErrorMessage.propTypes = {
  error: PropTypes.any,
  touched: PropTypes.bool
};

InputErrorMessage.defaultProps = {
  error: undefined,
  touched: false
};

export default InputErrorMessage;
