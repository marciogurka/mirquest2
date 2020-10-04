import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, Link, Button, Dialog, DialogActions, TextField, Toolbar, IconButton, AppBar, Tabs, Tab, Grid, Slide } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import { toast } from 'react-toastify';
import moment from 'moment';
import { ResultTextArea, CustomAppBar, RequestInfo, DialogContainer, InfoGrid } from './styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const fileRegex = new RegExp('(.txt)|(.fa)+');

const RequestInfoDialog = props => {
  const { openRequestInfoDialog, closeCallback, requestRecord } = props;
  const [result, setResult] = useState('');
  const [value, setValue] = useState(0);

  const handleChange = (event, val) => {
    setValue(val);
  };

  const generateAndDownloadLink = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        toast.error('Ops! Something went wrong while trying to download result file', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  };

  const downloadFile = (requestObject, isResultFile) => {
    const { tool, request, requestCode } = requestObject;
    // pk = 1 -> mirinho
    if (tool.pk === 1) {
      // if result file, get the correct the path
      let filePath = request.file;
      let { fileName } = request;
      if (isResultFile) {
        fileName = request.fileName.replace(fileRegex, '_out.fa');
        filePath = filePath.replace(request.fileName, fileName);
      }
      generateAndDownloadLink(filePath, fileName);
    }
    // pk = 2 -> mirinho
    else if (tool.pk === 2) {
      // if result file, get the correct the path
      const fileName = `result_mirboost_${requestCode}.txt`;
      const mirboostOutFileUrl = request.file.replace(request.fileName, fileName);
      generateAndDownloadLink(mirboostOutFileUrl, fileName);
    }
  };

  const loadResultFile = requestObject => {
    const { request, requestCode, tool } = requestObject;
    const fetchAndProcessFile = fileUrl => {
      fetch(fileUrl)
        .catch(error => {
          toast.error('Ops! Something went wrong while trying to retrieve result file', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          setResult('Ops! Something went wrong while trying to retrieve result file');
        })
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          if (blob.size > 0) {
            let fileReader;
            const handleFileRead = e => {
              const content = fileReader.result;
              setResult(content);
            };

            const handleFileChosen = file => {
              fileReader = new FileReader();
              fileReader.onloadend = handleFileRead;
              fileReader.readAsText(file);
            };

            handleFileChosen(blob);
          } else {
            setResult('Empty result file');
          }
        });
    };
    // pk = 1 -> mirinho
    if (tool.pk === 1) {
      const mirinhoOutFileName = request.fileName.replace(fileRegex, '_out.fa');
      const mirinhoOutFileUrl = request.file.replace(request.fileName, mirinhoOutFileName);
      fetchAndProcessFile(mirinhoOutFileUrl);
    } // pk = 2 -> mirinho
    else if (tool.pk === 2) {
      const mirboostOutFileUrl = request.file.replace(request.fileName, `result_mirboost_${requestCode}.txt`);
      fetchAndProcessFile(mirboostOutFileUrl);
    }
  };

  if (requestRecord && requestRecord.pk && !result) {
    loadResultFile(requestRecord);
  }

  const close = () => {
    closeCallback();
    setResult('');
    setValue(0);
  };

  const buttonOptions = [
    {
      label: 'Download Input File',
      onClick: () => downloadFile(requestRecord, false),
      variant: 'contained',
      icon: <SaveIcon />
    },
    {
      label: 'Download Result File',
      onClick: () => downloadFile(requestRecord, true),
      variant: 'contained',
      icon: <SaveIcon />
    },
    {
      label: 'Close',
      onClick: close,
      variant: 'contained'
    }
  ];
  return (
    <>
      <Dialog open={openRequestInfoDialog} TransitionComponent={Transition} fullScreen>
        <CustomAppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={close} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <RequestInfo variant="h6" color="inherit">
              Result for request:
              {requestRecord ? requestRecord.requestCode : null}
            </RequestInfo>
          </Toolbar>
        </CustomAppBar>
        <DialogContainer>
          <AppBar position="static" color="default" id="alert-dialog-slide-description">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" scrollButtons="on" indicatorColor="primary" textColor="primary">
              <Tab label="Info" />
              <Tab label="Result" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <InfoGrid container spacing={24}>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-code"
                  label="Code"
                  value={requestRecord && requestRecord.requestCode ? requestRecord.requestCode : ''}
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-email"
                  label="Created by"
                  value={requestRecord && requestRecord.request ? `${requestRecord.request.userName} - ${requestRecord.userEmail}` : ''}
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-fasta-file"
                  label="Fasta input file"
                  value={requestRecord && requestRecord.request ? requestRecord.request.fileName : ''}
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-tool-name"
                  label="Tool selected"
                  value={requestRecord && requestRecord.tool ? requestRecord.tool.name : ''}
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-created-time"
                  label="Process created at"
                  value={requestRecord && requestRecord.createdDate ? moment(requestRecord.createdDate).format('L LT') : ''}
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="outlined-process-time"
                  label="Process time"
                  value={
                    requestRecord && requestRecord.totalTime
                      ? moment.utc(moment.duration(requestRecord.totalTime).asMilliseconds()).format('HH [h] mm [m] ss [s] SSS [ms]')
                      : ''
                  }
                  margin="normal"
                  variant="outlined"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {requestRecord && requestRecord.tool && requestRecord.tool.pk === 1 && (
                  <Typography>
                    <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4448272/" variant="body1" target="_blank">
                      Get more info about the Mirinho tool and how the results are organized
                    </Link>
                  </Typography>
                )}
                {requestRecord && requestRecord.tool && requestRecord.tool.pk === 2 && (
                  <Typography>
                    <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4408786/" variant="body1" target="_blank">
                      Get more info about the miRBoost tool and how the results are organized
                    </Link>
                  </Typography>
                )}
              </Grid>
            </InfoGrid>
          )}
          {value === 1 && (
            <InfoGrid container spacing={24}>
              <Grid item xs={12}>
                <ResultTextArea
                  id="result-textarea"
                  label="Result"
                  placeholder=""
                  multiline
                  margin="normal"
                  variant="outlined"
                  value={result}
                  disabled
                  fullWidth
                />
              </Grid>
            </InfoGrid>
          )}
        </DialogContainer>
        <DialogActions>
          {buttonOptions.map(bOption => (
            <Button variant={bOption.variant || 'text'} onClick={bOption.onClick} color="primary">
              {bOption.icon || null}
              {bOption.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
};

RequestInfoDialog.propTypes = {
  openRequestInfoDialog: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  requestRecord: PropTypes.object.isRequired
};

export default RequestInfoDialog;
