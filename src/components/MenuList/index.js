import React from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';

import { Link } from 'react-router-dom';

const MenuList = () => {
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/process">
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Process File" />
      </ListItem>
      <ListItem button component={Link} to="/report">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </List>
  );
};

export default MenuList;
