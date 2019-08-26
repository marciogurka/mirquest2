import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './ConfirmStep.css';
import { confirmStepStyles } from './ConfirmStep.style';

class ConfirmStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userName: "",
    };
  }

  render() {
    const { classes } = this.props;
    const { userEmail, userName } = this.state;
    const handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };
    return (
      <div className="tool-choose-step">
        <Typography variant="h5" gutterBottom> Please confirm your request </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4} className={classes.fullHeight}>
            <Paper className={[classes.paper, classes.fullHeight]}>
              <Typography variant="h6" gutterBottom className={classes.infoTitle}> You choose this tools </Typography>
              <List className={classes.root} subheader={<li />}>
                {this.props.selectedTools.map((tool, index) => (
                  <ListItem key={`tool-${index}`} dense={true}>
                    <ListItemText primary={`${tool.name}`} secondary={`Tool number: ${index + 1}`} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" gutterBottom className={classes.infoTitle}> You choose this files to be analyzed </Typography>
              <List className={classes.root} subheader={<li />}>
                {this.props.files.map((file, index) => (
                  <ListItem key={`file-${index}`} dense={true}>
                  <ListItemText primary={`Name: ${file.name}`} secondary={`Size: ${file.size} bytes`} />
                </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom className={classes.infoTitle}> Please provide your info to receive the notification when the processing is finished</Typography>
                <form className={`${classes.container} ${classes.userForm}`} noValidate autoComplete="off">
                  <TextField
                    id="standard-required"
                    label="Name"
                    className={classes.textField}
                    value={userName}
                    onChange={handleChange('userName')}
                    margin="normal"
                    fullWidth="true"
                    required="true"
                  />
                  <TextField
                    id="standard-required"
                    label="Email"
                    className={classes.textField}
                    value={userEmail}
                    onChange={handleChange('userEmail')}
                    margin="normal"
                    fullWidth="true"
                    required="true"
                    type="email"
                  />
                </form>
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
