import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuList from './MenuList';
import { CustomDrawer, DrawerHeader, MenuLogo } from './styles';

const AppDrawer = props => {
  const { open, handleDrawerClose } = props;
  return (
    <CustomDrawer variant="persistent" anchor="left" open={open}>
      <DrawerHeader>
        <MenuLogo alt="miRQuest 2" src="logo_black.png" />
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <MenuList />
    </CustomDrawer>
  );
};

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
};

export default AppDrawer;
