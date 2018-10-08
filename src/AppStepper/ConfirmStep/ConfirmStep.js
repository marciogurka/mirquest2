import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import './ConfirmStep.css';
import { confirmStepStyles } from './ConfirmStep.style';

class ConfirmStep extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="tool-choose-step">
        <Typography variant="h5" gutterBottom> Please confirm your request </Typography>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom> You choose this tools </Typography>
              <List className={classes.root} subheader={<li />}>
                {this.props.selectedTools.map((tool, index) => (
                  <ListItem key={`tool-${index}`} dense={true}>
                    <ListItemText primary={`${tool.name}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom> You choose this files to be analyzed </Typography>
              {this.props.files.map((file, index) => (
                <ListItem key={`file-${index}`} dense={true}>
                  <ListItemText primary={`Name: ${file.name}`} secondary={`Size: ${file.size} bytes`} />
                </ListItem>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ConfirmStep.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedTools: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
};

export default withStyles(confirmStepStyles)(ConfirmStep);
