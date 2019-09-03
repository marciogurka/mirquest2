import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';

import './StartPage.css';
import { startPageStyles } from './StartPage.style';

import { Link } from "react-router-dom";


class StartPage extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Grid container spacing={16} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="display1" gutterBottom> Welcome to miRQuest 2</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperContainer}>
              <Button className="button-home-page" component={Link} to="/process">
                <TimelineIcon />
                Process your data
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperContainer}>
              <Button className="button-home-page" component={Link} to="/report">
                <BarChartIcon />
                Check a report
              </Button>
            </Paper>
          </Grid>
        </Grid>
    );
  }

  onDrop(files) {
    this.props.updateFiles(files);
  }
}

StartPage.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  updateFiles: PropTypes.func,
};

export default withStyles(startPageStyles)(StartPage);
