import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { mainListItems } from './MenuList';
import { styles } from './App.style';

import AppStepper from './AppStepper/AppStepper';
import StartPage from './StartPage/StartPage';
import ReportPage from './ReportPage/ReportPage';
import AppFooter from './AppFooter/AppFooter';
import ContactDialog from './ContactDialog/ContactDialog';

const App = props => {
  const { classes, theme } = props;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const updateFiles = files => {
    setFiles(files);
  };

  return (
    <Router>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="absolute" className={classNames(classes.appBar, open && classes.appBarShift)}>
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <Tooltip title="Menu">
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <Typography component="h1" variant="title" color="inherit" noWrap className={classes.title}>
              miRQuest 2
            </Typography>
            <Tooltip title="More info">
              <IconButton aria-owns="menu-appbar" aria-haspopup="true" onClick={handleDialogOpen} color="inherit">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <Avatar alt="miRQuest 2" src="logo.png" className={classes.bigAvatar} />
            <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          </div>
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/process/" component={AppStepper} />
            <Route path="/report/" component={ReportPage} />
            <Route component={StartPage} />
          </Switch>
        </main>
        <ContactDialog open={openDialog} onClose={handleDialogClose} />
        <AppFooter />
      </div>
    </Router>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
