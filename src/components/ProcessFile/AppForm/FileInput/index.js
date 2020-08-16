import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Button, FormLabel, FormHelperText, Box } from '@material-ui/core';
import { useField } from 'formik';
import InputErrorMessage from '../InputErrorMessage';

const FileInput = ({ ...inputProps }) => {
  const [field, meta, helpers] = useField(inputProps);
  const { error, touched } = meta;
  const [selectedFile, setSelectedFile] = useState({});
  const { label, buttonLabel } = inputProps;

  const myHandleChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    helpers.setValue(file);
  };

  return (
    <FormControl fullWidth>
      <FormLabel component="legend" error={error && touched}>
        {label}
      </FormLabel>
      <Box mt={1} display="flex">
        <Button variant="contained" color="primary" component="label">
          {buttonLabel}
          <input name={field.name} onChange={myHandleChange} type="file" style={{ display: 'none' }} accept=".txt,.fa" />
        </Button>
        {selectedFile && (
          <Box ml={2} mt={1}>
            <FormHelperText>{`File selected: ${field.value ? selectedFile.name : 'No file selected'}`}</FormHelperText>
          </Box>
        )}
      </Box>
      <InputErrorMessage error={error} touched={touched} />
    </FormControl>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  multiline: PropTypes.bool
};

FileInput.defaultProps = {
  error: false,
  multiline: false
};

export default FileInput;
