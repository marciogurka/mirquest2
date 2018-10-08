import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './ToolChooseStep.css';
import { toolChooseStepStyles } from './ToolChooseStep.style';

import { predictionTools } from './ToolChooseData';


class ToolChooseStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictionTools: predictionTools
    }
  }

  changeSelectProp(tool) {
    let newTool = this.state.predictionTools.find(predTool => predTool.id === tool.id);

    if (tool) {
      newTool.selected = !newTool.selected
    }

    this.setState({predictionTools})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="tool-choose-step">
        <Typography variant="body1" gutterBottom component="span"> Please choose your FASTA files to be analyzed</Typography>
        <div className={classes.toolList}>
          {
            predictionTools.map((tool, index) => {
              return <Button variant="contained"
                key={index}
                color={this.state.predictionTools[index].selected ? 'primary' : null}
                onClick={() => this.changeSelectProp(tool)}
                className={ classes.toolOption }>
                  { tool.name }
              </Button>
            })
          }
        </div>
      </div>
    );
  }
}

ToolChooseStep.propTypes = {
  classes: PropTypes.object.isRequired,
  files: PropTypes.array,
  updateFiles: PropTypes.func,
};

export default withStyles(toolChooseStepStyles)(ToolChooseStep);
