import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import AppForm from '../AppForm';

const ProcessFile = props => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <AppForm />
      </Grid>
      <Grid item xs={6}>
        <AppForm />
      </Grid>
    </Grid>
  );
};

ProcessFile.propTypes = {};

export default ProcessFile;
