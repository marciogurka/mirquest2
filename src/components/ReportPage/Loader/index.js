import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from '~/theme';
import { Loader as RingLoader, LoaderContainer } from './styles';

const Loader = props => {
  const { searching } = props;
  return (
    <LoaderContainer>
      <RingLoader sizeUnit="px" size={150} color={theme.palette.primary.main} loading={searching} />
      <Typography variant="h5" gutterBottom>
        Searching...
      </Typography>
    </LoaderContainer>
  );
};

Loader.propTypes = {
  searching: PropTypes.bool.isRequired
};

export default Loader;
