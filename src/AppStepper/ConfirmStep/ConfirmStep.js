import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TimelineIcon from '@material-ui/icons/Timeline';

import './ConfirmStep.css';
import { confirmStepStyles } from './ConfirmStep.style';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';

class ConfirmStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userName: "",
      loading: false
    };
  }

  handleSubmit = () => {
    let validRequest = true;
    const { userName, userEmail } = this.state;
    const { files, selectedTools, showLoading, hideLoading } = this.props;
    this.setState({
      loading: true
    });
    showLoading("Do not close this window, processing your request...");
    const createData = {
      userName,
      userEmail,
    }
    
    if (selectedTools.length) {
      const toolsData = []
      selectedTools.forEach((tool, index) => {
        toolsData.push(tool.id)
      });
      createData.tools = toolsData
    } else {
      validRequest = false;
    }

    if (!files.length) {
      validRequest = false;
    } else {
      createData.fileName = files[0].name;
    }

    if (validRequest) {
      axios.post(`http://localhost:8000/api/request_records/`, createData)
        .then(response => {
          const form = new FormData();
          form.append('file', files[0]);
          axios.patch(`http://localhost:8000/api/request_records/${response.data.pk}/`, form)
            .then(request => {
              this.setState({
                loading: false
              });
              hideLoading();
              return request;
            })
            .catch(error => {
              this.setState({
                loading: false
              });
              hideLoading();
              console.error(error);
            });
        })
        .catch((error) => {
          this.setState({
            loading: false
          });
          hideLoading();
          console.error(error);
        });
    } else {
      console.error("Something is missing at your request, please try again");
    }
  }

  render() {
    const { classes } = this.props;
    const { userEmail, userName, loading } = this.state;
    const handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };
    return (
      <div className="tool-choose-step">
        <Typography variant="h5" gutterBottom align="center" className={classes.stepTitle}> Please confirm your request </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4} className={classes.fullHeight}>
            <Paper className={`${classes.paper} ${classes.fullHeight}`}>
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
              <ValidatorForm className={`${classes.container} ${classes.userForm}`} ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
                <TextValidator
                      label = "Name"
                      onChange={handleChange('userName')}
                      name="userName"
                      className={classes.textField}
                      value={userName}
                      validators={['required']}
                      errorMessages={['This field is required']}
                      fullWidth={true}
                  />
                  <TextValidator
                      label="Email"
                      onChange={handleChange('userEmail')}
                      className={classes.textField}
                      name="userEmail"
                      value={userEmail}
                      validators={['required', 'isEmail']}
                      errorMessages={['This field is required', 'Please insert a valid email']}
                      fullWidth={true}
                  />
                  <Button variant="contained"
                    color="primary"
                    className = { classes.submitBtn }
                    type="submit"
                    fullWidth={true}
                    disabled={loading}
                  >
                    Start Process the data
                    <TimelineIcon className={classes.rightIcon} />
                  </Button>
                </ValidatorForm>
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
