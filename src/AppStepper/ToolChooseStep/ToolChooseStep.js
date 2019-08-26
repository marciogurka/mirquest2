import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './ToolChooseStep.css';
import { toolChooseStepStyles } from './ToolChooseStep.style';

import { predictionTools, getSelectedTools } from './ToolChooseData';


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
      newTool.selected = !newTool.selected;
      this.setState({predictionTools});
      this.props.onUpdateTools(getSelectedTools(this.state.predictionTools));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="tool-choose-step">
        <Typography variant="h5" gutterBottom> Please choose the tools to process your data</Typography>
        <div className={classes.toolList}>
          {
            predictionTools.map((tool, index) => {
              return <Button variant="contained"
                key={index}
                disabled={tool.disabled}
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
  onUpdateTools: PropTypes.func,
};

export default withStyles(toolChooseStepStyles)(ToolChooseStep);
