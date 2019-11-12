import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';
import ShareIcon from '@material-ui/icons/Share';

import './StartPage.css';
import { startPageStyles } from './StartPage.style';

import { Link } from "react-router-dom";


class StartPage extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root} elevation={2}>
          <div className={classes.background}></div>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Typography variant="h2" align="center" gutterBottom className={classes.heroTitle}> Welcome to <b>miRQuest 2</b></Typography>
            </Grid>

            <Grid item xs={12} className={classes.homeOptionsGridContainer}>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        What is miRQuest 2?
                      </Typography>
                      <Typography component="p">
                        miRQuest 2 is a web based application that integrates a few microRNA predictors tools and allow the user to 
                        process the same file between multiple predictors at the same time.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://github.com/marciogurka/mirquest2">
                      <ShareIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Contribute
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardActionArea className={classes.cardArea}>
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        How it works??
                      </Typography>
                      <Typography component="p">
                        You can choose between the "Process Your Data" option, where you can upload a microRNA sequence, then choose between the available
                        predictors, add your contact info and process the sequence. After that you can check the "Check a Report" option, where you can search
                        using your request code or email to check and download the results.  
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            
            <Grid item xs={12} className={classes.homeOptionsGridContainer}>
              <Grid item xs={12} sm={6} className={classes.homeOptionGrid}>
                  <Button variant="contained" color="primary" className="button-home-page" component={Link} to="/process">
                    <TimelineIcon />
                    Process your data
                  </Button>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.homeOptionGrid}>
                  <Button variant="contained" color="primary" className="button-home-page" component={Link} to="/report">
                    <BarChartIcon />
                    Check a report
                  </Button>
              </Grid>
            </Grid>
          </Grid>
          
        </Paper>
    );
  }
}

StartPage.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  updateFiles: PropTypes.func,
};

export default withStyles(startPageStyles)(StartPage);
