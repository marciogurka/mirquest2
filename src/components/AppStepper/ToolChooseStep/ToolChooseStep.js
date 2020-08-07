import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './ToolChooseStep.css';
import { toolChooseStepStyles } from './ToolChooseStep.style';

const ToolChooseStep = props => {
  const getSelectedTools = tools => {};
  const predToolsArray = [];
  const { classes, onUpdateTools } = props;
  const [predictionTools, setPredictionTools] = useState(predToolsArray);
  const changeSelectProp = tool => {
    if (tool) {
      const updatedTools = predictionTools.map(predTool => {
        const updatedTool = predTool;
        if (updatedTool.id === tool.id) {
          updatedTool.selected = !updatedTool.selected;
        }
        return updatedTool;
      });
      setPredictionTools(updatedTools);
      onUpdateTools(getSelectedTools(predictionTools));
    }
  };

  return (
    <div className="tool-choose-step">
      <Typography variant="h5" gutterBottom align="center" className={classes.stepTitle}>
        Please choose the tools to process your data
      </Typography>
      <div className={classes.toolList}>
        {predictionTools.map((tool, index) => {
          if (!tool.disabled) {
            return (
              <Button
                variant="contained"
                key={uuidv4()}
                disabled={tool.disabled}
                color={predictionTools[index].selected ? 'primary' : null}
                onClick={() => changeSelectProp(tool)}
                className={classes.toolOption}
              >
                {tool.name}
              </Button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

ToolChooseStep.propTypes = {
  classes: PropTypes.object.isRequired,
  onUpdateTools: PropTypes.func
};

ToolChooseStep.defaultProps = {
  onUpdateTools: () => {}
};

export default withStyles(toolChooseStepStyles)(ToolChooseStep);
