import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Tooltip, IconButton, Box, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import QueueIcon from '@material-ui/icons/Queue';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom';
import { CustomAppBar, Title, HeaderLogo } from './styles';

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
        <Box display="flex" flex={1}>
          <HeaderLogo alt="miRQuest 2" src="logo.png" />
          <Title component="h1" variant="h6" color="inherit" noWrap>
            miRQuest 2
          </Title>
        </Box>
        <Hidden xsDown>
          <Tooltip title="Home">
            <IconButton component={Link} color="inherit" to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Process File">
            <IconButton component={Link} color="inherit" to="/process">
              <QueueIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reports">
            <IconButton component={Link} color="inherit" to="/report">
              <BarChartIcon />
            </IconButton>
          </Tooltip>
        </Hidden>

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
