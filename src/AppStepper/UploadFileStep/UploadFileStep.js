import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import './UploadFileStep.css';
import { uploadFileStepStyles } from './UploadFileStep.style';


class UploadFileStep extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="start-page">
        <Typography variant="h5" gutterBottom align="center" className={classes.stepTitle}> Please choose your FASTA files to be analyzed </Typography>
        <div>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)} className={classes.dropzone} accept=".fa" maxSize={10000000}>
              <span>Try dropping some FASTA files here, or click to select files to upload.</span>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            {
              (this.props.files.length > 0) ?
                (<List>
                  { 
                    this.props.files.map((f, index) =>
                      <ListItem key={index}>
                        <Avatar>
                          <FileCopyIcon />
                        </Avatar>
                        <ListItemText
                          primary={f.name}
                          secondary={`${f.size} bytes`}
                        />
                      </ListItem>)
                  }
                 </List>)
              :
               <span>No files were selected yet.</span>
            }
            
          </aside>
        </div>
      </div>
    );
  }

  onDrop(files) {
    this.props.onChooseFiles(files);
  }
}

UploadFileStep.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  updateFiles: PropTypes.func,
};

export default withStyles(uploadFileStepStyles)(UploadFileStep);
