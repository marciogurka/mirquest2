import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UploadFileStep from './UploadFileStep/UploadFileStep';
import ToolChooseStep from './ToolChooseStep/ToolChooseStep';
import ConfirmStep from './ConfirmStep/ConfirmStep';
import { appStepperStyle } from './AppStepper.style';
import './AppStepper.css';

import axios from 'axios';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';

const override = css`
    display: block;
    margin: 0 auto;
`;

function getSteps() {
  return ['Select FASTA files', 'Select Prediction\'s tools', 'Confirm the request'];
}

class AppStepper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      files: [],
      selectedTools: [],
      skipped: new Set(),
      loading: false,
      loadingMessage: "Do not close this window, processing your request..."
    };
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UploadFileStep onChooseFiles={(files) => this.handleUpdateProperty('files', files)} files={this.state.files}/>;
      case 1:
        return <ToolChooseStep onUpdateTools={(selectedTools) => this.handleUpdateProperty('selectedTools', selectedTools)}/>;
      case 2:
        return <ConfirmStep selectedTools={this.state.selectedTools} files={this.state.files}/>;
      default:
        return 'Unknown step';
    }
  }

  handleUpdateProperty(propName, newValue) {
    this.setState({[propName]: newValue})
  }

  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep, files, selectedTools } = this.state;
    const steps = getSteps();
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    // if is the last page, send the request
    if (activeStep === steps.length - 1) {
      this.setState({
        loading: true
      });
      console.log(selectedTools)
      const request_info = {
        userName: "marcio",
        userEmail: "marcio@gmail.com",
        tools: [1],
        file: files[0]
      }
      const form = new FormData();
      form.append('userName', 'marcio');
      form.append('userEmail', 'marcio@gmail.com');
      form.append('tools', [1]);

      if (files[0]) {
        form.append('file', files[0]);
      }
      axios.post(`http://localhost:8000/api/request_records/`, form)
        .then(res => {
          this.setState({
            loading: false
          });
          console.log(res)
          // const persons = res.data;
          // this.setState({
          //   persons
          // });
        })
        .catch(function (error) {
          this.setState({
            loading: false
          });
          console.error(error);
        });
    } else {
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });
    }
    
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  checkNextButtonDisabled() {
    const { activeStep } = this.state;
    switch (activeStep) {
      case 0:
        if(this.state.files.length > 0) {
          return false;
        } else {
          return true;
        }
      case 1:
        if(this.state.selectedTools.length > 0) {
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, files, selectedTools } = this.state;

    return (
      <div className={classes.root}>
      < div className = { `sweet-loading ${ !this.state.loading ? "hide" : ""}` } >
        < RingLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
          gutterBottom
        />
        <Typography variant="h5" gutterBottom> {this.state.loadingMessage} </Typography>
      </div> 
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
              <div className={classes.btnContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.checkNextButtonDisabled()}
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

AppStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(appStepperStyle)(AppStepper);
