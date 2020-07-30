import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import { toast } from 'react-toastify';

import UploadFileStep from './UploadFileStep/UploadFileStep';
import ToolChooseStep from './ToolChooseStep/ToolChooseStep';
import ConfirmStep from './ConfirmStep/ConfirmStep';
import HelpDialog from './HelpDialog/HelpDialog';
import { appStepperStyle } from './AppStepper.style';
import './AppStepper.css';
import 'react-toastify/dist/ReactToastify.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

function getSteps() {
  return ['Select FASTA files', "Select Prediction's tools", 'Confirm the request'];
}

toast.configure();

const AppStepper = props => {
  const { classes } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const steps = getSteps();

  const showLoading = messageText => {
    setLoading(true);
    setLoadingMessage(messageText || 'Loading...');
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <UploadFileStep onChooseFiles={filesArray => setFiles(filesArray)} files={files} />;
      case 1:
        return <ToolChooseStep onUpdateTools={selectedToolsArray => setSelectedTools(selectedToolsArray)} />;
      case 2:
        return <ConfirmStep selectedTools={selectedTools} files={files} showLoading={showLoading} hideLoading={hideLoading} />;
      default:
        return 'Unknown step';
    }
  };

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const updatedSkipped = new Set();
    if (isStepSkipped(activeStep)) {
      skipped.forEach(step => {
        if (step !== activeStep) {
          updatedSkipped.add(step);
        }
      });
    }
    setSkipped(updatedSkipped);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const updatedSkipped = new Set(skipped.values());
    updatedSkipped.add(activeStep);
    setSkipped(updatedSkipped);
    setActiveStep(activeStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const checkNextButtonDisabled = () => {
    switch (activeStep) {
      case 0:
        return files.length > 0;
      case 1:
        return selectedTools.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className={classes.root}>
      <Tooltip title="Help" placement="left">
        <IconButton aria-label="Help" className={classes.helpIcon} onClick={handleDialogOpen}>
          <HelpIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <div className={`sweet-loading ${!loading ? 'hide' : ''}`}>
        <RingLoader css={override} sizeUnit="px" size={150} color="#123abc" loading={loading} gutterBottom />
        <Typography variant="h5" gutterBottom>
          {loadingMessage}
        </Typography>
      </div>
      <HelpDialog open={openDialog} onClose={handleDialogClose} />
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed - you&quot;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div className={classes.btnContainer}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {activeStep !== steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={checkNextButtonDisabled()}
                  onClick={ev => handleNext(ev)}
                  className={classes.button}
                >
                  Next
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AppStepper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStepperStyle)(AppStepper);
