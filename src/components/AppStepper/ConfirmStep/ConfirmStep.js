import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import SuccessDialog from '~/components/SuccessDialog/SuccessDialog';
import { confirmStepStyles } from './ConfirmStep.style';
import { resetSelectedTools } from '../ToolChooseStep/ToolChooseData';

import client from '~/client';

const ConfirmStep = props => {
  const { files, selectedTools, showLoading, hideLoading, classes } = props;
  const form = createRef();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [requestRecord, setRequestRecord] = useState(null);

  const closeSuccessDialog = () => {
    resetSelectedTools();
    setOpenSuccessDialog(false);
  };

  const handleFormNotValid = errors => {
    toast.warning('Please fill the form with valid information!', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  const handleSubmit = () => {
    let validRequest = true;
    setLoading(true);
    showLoading('Do not close this window, processing your request...');
    const createData = {
      userName,
      userEmail
    };

    if (selectedTools.length) {
      const toolsData = [];
      selectedTools.forEach(tool => {
        toolsData.push(tool.id);
      });
      createData.tools = toolsData;
    } else {
      validRequest = false;
    }

    if (!files.length) {
      validRequest = false;
    } else {
      createData.fileName = files[0].name;
    }

    if (validRequest) {
      client
        .post(`/api/request_records/`, createData)
        .then(response => {
          const formData = new FormData();
          formData.append('file', files[0]);
          client
            .patch(`/api/request_records/${response.data.pk}/`, formData)
            .then(resp => {
              setLoading(false);
              setOpenSuccessDialog(true);
              setRequestRecord(resp.data);
              hideLoading();
              return resp;
            })
            .catch(error => {
              setLoading(false);
              hideLoading();
              console.error(error);
              toast.error('Ops! Something went wrong, please try again later!', {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            });
        })
        .catch(error => {
          setLoading(false);
          hideLoading();
          console.error(error);
          toast.error('Ops! Something went wrong, please try again later!', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        });
    } else {
      console.error('Something is missing at your request, please try again');
      toast.warn('Something is missing at your request, please try again', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  return (
    <div className="tool-choose-step">
      <SuccessDialog openSuccessDialog={openSuccessDialog} closeCallback={closeSuccessDialog} requestRecord={requestRecord} />
      <Typography variant="h5" gutterBottom align="center" className={classes.stepTitle}>
        Please confirm your request
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={4} className={classes.fullHeight}>
          <Paper className={`${classes.paper} ${classes.fullHeight}`}>
            <Typography variant="subtitle2" gutterBottom className={classes.infoTitle}>
              You choose this tools
            </Typography>
            <List className={classes.root} subheader={<li />}>
              {selectedTools.map((tool, index) => (
                <ListItem key={uuidv4()} dense>
                  <ListItemText primary={`${tool.name}`} secondary={`Tool number: ${index + 1}`} />
                </ListItem>
              ))}
            </List>
            <Typography variant="subtitle2" gutterBottom className={classes.infoTitle}>
              You choose this files to be analyzed
            </Typography>
            <List className={classes.root} subheader={<li />}>
              {files.map(file => (
                <ListItem key={uuidv4()} dense>
                  <ListItemText primary={`Name: ${file.name}`} secondary={`Size: ${file.size} bytes`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1" gutterBottom className={classes.infoTitle}>
              Please provide your info to receive the notification when the processing is finished
            </Typography>
            <ValidatorForm
              className={`${classes.container} ${classes.userForm}`}
              ref={form}
              onSubmit={handleSubmit}
              onError={errors => handleFormNotValid(errors)}
            >
              <TextValidator
                label="Name"
                onChange={ev => setUserName(ev.target.value)}
                name="userName"
                className={classes.textField}
                value={userName}
                validators={['required']}
                errorMessages={['This field is required']}
                fullWidth
              />
              <TextValidator
                label="Email"
                onChange={ev => setUserEmail(ev.target.value)}
                className={classes.textField}
                name="userEmail"
                value={userEmail}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Please insert a valid email']}
                fullWidth
              />
              <Button variant="contained" color="primary" className={classes.submitBtn} type="submit" fullWidth disabled={loading}>
                Start Process the data
                <TimelineIcon className={classes.rightIcon} />
              </Button>
            </ValidatorForm>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

ConfirmStep.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedTools: PropTypes.array.isRequired,
  showLoading: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired
};

export default withStyles(confirmStepStyles)(ConfirmStep);
