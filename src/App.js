import React from 'react';
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
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems } from './MenuList';
import { styles } from './App.style';

import AppStepper from './AppStepper/AppStepper';
import StartPage from './StartPage/StartPage';
import ReportPage from './ReportPage/ReportPage';

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: []
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateFiles = (files) => {
    this.setState({files});
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
      <Router>  
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                miRQuest 2
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Avatar alt="miRQuest 2" src="/logo.png" className={classes.bigAvatar} />
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <List>
            {
              mainListItems
            }
          </List>
        </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route path="/" exact component={StartPage} />
            <Route path="/process/" component={AppStepper} />
            <Route path="/report/" component={ReportPage} />
          </main>
        </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
