import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './UploadFileStep.css';
import { uploadFileStepStyles } from './UploadFileStep.style';


class UploadFileStep extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="start-page">
        <Typography variant="h5" gutterBottom> Please choose your FASTA files to be analyzed </Typography>
        <div>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)} className={classes.dropzone} accept=".fa">
              <span>Try dropping some FASTA files here, or click to select files to upload.</span>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            {
              (this.props.files.length > 0) ?
                (<ul>
                  { this.props.files.map((f, index) => <li key={index}>{f.name} - {f.size} bytes</li>) }
                 </ul>)
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
