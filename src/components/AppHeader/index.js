import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Tooltip, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import { CustomAppBar, Title } from './styles';

const AppHeader = props => {
  const { open, handleDrawerOpen, handleDialogOpen } = props;
  return (
    <CustomAppBar position="absolute" open={open}>
      <Toolbar>
        <Tooltip title="Menu">
          <IconButton color="inherit" aria-label="Menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Title component="h1" variant="h6" color="inherit" noWrap>
          miRQuest 2
        </Title>
        <Tooltip title="More info">
          <IconButton aria-owns="menu-appbar" aria-haspopup="true" onClick={handleDialogOpen} color="inherit">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </CustomAppBar>
  );
};

AppHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleDialogOpen: PropTypes.func.isRequired
};

export default AppHeader;
