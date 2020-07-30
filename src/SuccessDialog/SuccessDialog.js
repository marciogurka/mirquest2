import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import './SuccessDialog.css';
import { Link } from 'react-router-dom';
import { successDialogStyles } from './SuccessDialog.style';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const SuccessDialog = props => {
  const { openSuccessDialog, closeCallback, requestRecord } = props;

  return (
    <div>
      <Dialog
        open={openSuccessDialog}
        TransitionComponent={Transition}
        disableBackdropClick
        disableEscapeKeyDown
        keepMounted
        onClose={closeCallback}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Your request was successfully been created!!!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We are processing it right now! You will receive an email as soon as it finishes. In the meantime, you can check the process status using
            the menu option and providing the following code:
            <Typography className="code-span" component="span" variant="subtitle2" align="center" color="primary">
              {requestRecord ? requestRecord.code : null}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCallback} color="primary" component={Link} to="/">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SuccessDialog.propTypes = {
  openSuccessDialog: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  requestRecord: PropTypes.object.isRequired
};

export default withStyles(successDialogStyles)(SuccessDialog);
