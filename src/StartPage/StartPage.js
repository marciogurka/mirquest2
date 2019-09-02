import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './StartPage.css';
import { startPageStyles } from './StartPage.style';


class StartPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="start-page">
        <Typography variant="display1" gutterBottom> Welcome to miRQuest 2</Typography>
      </div>
    );
  }

  onDrop(files) {
    this.props.updateFiles(files);
  }
}

StartPage.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  updateFiles: PropTypes.func,
};

export default withStyles(startPageStyles)(StartPage);
