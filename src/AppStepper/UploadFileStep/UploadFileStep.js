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
    this.state = {
      files: []
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="start-page">
        <Typography variant="body1" gutterBottom component="span"> Please choose your FASTA files to be analyzed</Typography>
        <div>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)} className={classes.dropzone} accept=".fa">
              <span>Try dropping some FASTA files here, or click to select files to upload.</span>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </div>
      </div>
    );
  }

  onDrop(files) {
    this.setState({files});
    this.props.onChooseFiles(this.state.files);
  }
}

UploadFileStep.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  updateFiles: PropTypes.func,
};

export default withStyles(uploadFileStepStyles)(UploadFileStep);
