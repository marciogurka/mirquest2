import React from 'react';
import { Grid } from '@material-ui/core';
import AppForm from './AppForm';
import HowItWorks from './HowItWorks';
import { FullHeightGrid } from './styles';

const ProcessFile = () => {
  return (
    <Grid container>
      <FullHeightGrid item xs={6}>
        <HowItWorks />
      </FullHeightGrid>
      <FullHeightGrid item xs={6}>
        <AppForm />
      </FullHeightGrid>
    </Grid>
  );
};

export default ProcessFile;
