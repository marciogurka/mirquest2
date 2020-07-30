import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import './UploadFileStep.css';
import { uploadFileStepStyles } from './UploadFileStep.style';

const UploadFileStep = props => {
  const { classes, onChooseFiles, files } = props;

  const onDrop = droppedFile => {
    onChooseFiles(droppedFile);
  };

  return (
    <div className="start-page">
      <Typography variant="h5" gutterBottom align="center" className={classes.stepTitle}>
        Please choose your sequence file to be processed
      </Typography>
      <div className="dropzone">
        <Dropzone onDrop={onDrop.bind(this)} className={classes.dropzone} accept={['.fa', '.txt']} maxSize={10000000}>
          <span>Try dropping a sequence file here, or click to select the sequence file to upload.</span>
        </Dropzone>
      </div>
      <aside>
        <h2>Sequence file choosen</h2>
        {files.length > 0 ? (
          <List>
            {files.map(file => (
              <ListItem key={uuidv4()}>
                <Avatar>
                  <FileCopyIcon />
                </Avatar>
                <ListItemText primary={file.name} secondary={`${file.size} bytes`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <span>No file was selected yet.</span>
        )}
      </aside>
    </div>
  );
};

UploadFileStep.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  onChooseFiles: PropTypes.func
};

UploadFileStep.defaultProps = {
  files: [],
  onChooseFiles: files => {
    console.log(files);
  }
};

export default withStyles(uploadFileStepStyles)(UploadFileStep);
