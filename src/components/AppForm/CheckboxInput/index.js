import React from 'react';
import { FormControl, FormControlLabel, Checkbox, FormLabel } from '@material-ui/core';
import { useField } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import InputErrorMessage from '../InputErrorMessage';

const CheckboxInput = ({ ...inputProps }) => {
  const [field, meta, helpers] = useField(inputProps);
  const { error, touched } = meta;

  const onCheck = o => {
    const arr = field.value || [];

    const pos = arr.indexOf(o.value);

    if (pos < 0) {
      arr.push(o.value);
    } else {
      arr.splice(pos, 1);
    }
    helpers.setTouched(inputProps.name);
    helpers.setValue(arr);
  };

  return (
    <FormControl>
      {inputProps.label && (
        <FormLabel component="legend" error={error && touched}>
          {inputProps.label}
        </FormLabel>
      )}
      {inputProps.options.map(o => {
        return (
          <FormControlLabel
            key={uuidv4()}
            control={
              <Checkbox
                checked={field.value ? field.value.indexOf(o.value) > -1 : false}
                onChange={() => onCheck(o)}
                name={inputProps.name}
                color="primary"
              />
            }
            label={o.label}
          />
        );
      })}
      <InputErrorMessage error={error} touched={touched} />
    </FormControl>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default CheckboxInput;
