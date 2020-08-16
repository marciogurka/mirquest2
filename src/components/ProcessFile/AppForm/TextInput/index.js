import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, TextField } from '@material-ui/core';
import { useField } from 'formik';
import InputErrorMessage from '../InputErrorMessage';

const TextInput = ({ ...inputProps }) => {
  const [field, meta, helpers] = useField(inputProps);
  const { error, touched } = meta;

  return (
    <FormControl fullWidth>
      <TextField fullWidth {...inputProps} multiline={inputProps.multiline} value={meta.value} error={Boolean(meta.error) && Boolean(meta.touched)} />
      <InputErrorMessage error={error} touched={touched} />
    </FormControl>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool
};

TextInput.defaultProps = {
  multiline: false
};

export default TextInput;
