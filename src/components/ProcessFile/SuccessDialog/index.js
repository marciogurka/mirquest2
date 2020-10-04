import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

import { Link } from 'react-router-dom';

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
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography component="span" variant="subtitle2" color="primary">
                {requestRecord ? requestRecord.code : null}
              </Typography>
            </Box>
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

export default SuccessDialog;
