import React from 'react';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import QueueIcon from '@material-ui/icons/Queue';
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
          <QueueIcon />
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
