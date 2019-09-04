import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import './RequestInfoDialog.css';
import { requestInfoDialogStyles } from './RequestInfoDialog.style';

import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RequestInfoDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            value: 0,
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    downloadFile = (requestRecord, isResultFile) => {
        // pk = 1 -> mirinho
        if (requestRecord.tool.pk === 1) {
            // if result file, get the correct the path
            let filePath = requestRecord.request.file;
            let fileName = requestRecord.request.fileName;
            if (isResultFile) {
                fileName = requestRecord.request.fileName.replace(".fa", "_out.fa");
                filePath = filePath.replace(requestRecord.request.fileName, fileName);
            }

            fetch(filePath)
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
                    toast.error("Ops! Something went wrong while trying to download result file", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
        }
    }

    loadResultFile = (requestRecord) => {
        // pk = 1 -> mirinho
        if (requestRecord.tool.pk === 1) {
            const mirinhoOutFileName = requestRecord.request.fileName.replace(".fa", "_out.fa");
            const mirinhoOutFileUrl = requestRecord.request.file.replace(requestRecord.request.fileName, mirinhoOutFileName);
            fetch(mirinhoOutFileUrl)
                .then(res => res.blob()) // Gets the response and returns it as a blob
                .then(blob => {
                    let fileReader;
                    const handleFileRead = (e) => {
                        const content = fileReader.result;
                        console.log(content);
                        this.setState({
                            result: content
                        });
                    };

                    const handleFileChosen = (file) => {
                        fileReader = new FileReader();
                        fileReader.onloadend = handleFileRead;
                        fileReader.readAsText(file);
                    };

                    handleFileChosen(blob);
                })
                .catch(error => {
                    toast.error("Ops! Something went wrong while trying to retrieve result file", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
        }
    }
    
    render() {
        const { openRequestInfoDialog, closeCallback, requestRecord, classes } = this.props;
        const { result, value } = this.state;
        if (requestRecord && requestRecord.pk && !result) {
            this.loadResultFile(requestRecord);
        }
        return (
        <div>
            <Dialog
                open={openRequestInfoDialog}
                TransitionComponent={Transition}
                fullScreen
                onClose={closeCallback}
            >
            <AppBar className={classes.appBar}>
                <Toolbar>
                <IconButton color="inherit" onClick={closeCallback} aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                    Result for request: { (requestRecord) ? requestRecord.requestCode: null }
                </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialogContainer}>
                <AppBar position="static"
                    color="default"
                    id="alert-dialog-slide-description" >
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Info" />
                        <Tab label="Result"/>
                    </Tabs>
                    </AppBar>
                    {value === 0 &&
                        <Grid
                            container
                            className={classes.infoGrid}
                            spacing={24}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    id="outlined-code"
                                    label="Code"
                                    className={classes.textField}
                                    value = {
                                        (requestRecord && requestRecord.requestCode) ? requestRecord.requestCode : ""
                                    }
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    id="outlined-email"
                                    label="Created by"
                                    className={classes.textField}
                                    value = {
                                        (requestRecord && requestRecord.request) ? requestRecord.request.userName + " - " + requestRecord.userEmail: ""
                                    }
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    id="outlined-fasta-file"
                                    label="Fasta input file"
                                    className={classes.textField}
                                    value = {
                                        (requestRecord && requestRecord.request) ? requestRecord.request.fileName : ""
                                    }
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    id="outlined-tool-name"
                                    label="Tool selected"
                                    className={classes.textField}
                                    value = {
                                        (requestRecord && requestRecord.tool) ? requestRecord.tool.name: ""
                                    }
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="outlined-created-time"
                                    label="Process created at"
                                    className={classes.textField}
                                    value = {
                                            (requestRecord && requestRecord.createdDate) ? moment(requestRecord.createdDate).format("L LT"): ""
                                            }
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="outlined-process-time"
                                    label="Process time"
                                    className={classes.textField}
                                    value=
                                    {
                                        (requestRecord && requestRecord.totalTime) ? moment.utc(moment.duration(requestRecord.totalTime).asMilliseconds()).format("HH [h] mm [m] ss [s] SSS [ms]"): ""
                                    }
                                    margin="normal"
                                    variant="outlined"
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                            
                            
                            
                        </Grid>
                    }
                    {value === 1 && 
                        <Grid
                            container
                            className={classes.infoGrid}
                            spacing={24}
                        >
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    id="result-textarea"
                                    label="Result"
                                    placeholder=""
                                    multiline
                                    className={classes.resultTextField}
                                    margin="normal"
                                    variant="outlined"
                                    value={ result }
                                    disabled={true}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    }
                
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={ev => this.downloadFile(requestRecord, false)} color="primary">
                    <SaveIcon className={classes.leftIcon} />
                    Download Input File
                </Button>
                <Button variant="contained" onClick={ev => this.downloadFile(requestRecord, true)} color="primary">
                    <SaveIcon className={classes.leftIcon} />
                    Download Result File
                </Button>
                <Button onClick={closeCallback} color="primary">
                Close
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}

RequestInfoDialog.propTypes = {
  openRequestInfoDialog: PropTypes.bool,
  closeCallback: PropTypes.func,
  requestRecord: PropTypes.object
};

export default withStyles(requestInfoDialogStyles)(RequestInfoDialog);
