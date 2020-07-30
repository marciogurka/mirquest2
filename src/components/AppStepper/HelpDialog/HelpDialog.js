import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Link from '@material-ui/core/Link';

import { helpDialogStyles } from './HelpDialog.style';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function TabContainer({ children, classes }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }} className={classes.tabContainer}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired
};

const HelpDialog = props => {
  const { classes, onClose, open } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, val) => {
    setValue(val);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-slide-title">Do you need some help??</DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
              <Tab label="Select FASTA File" />
              <Tab label="Select Predictors" />
              <Tab label="Confirm the Request" />
              <Tab label="FAQ" />
            </Tabs>
          </AppBar>
          <SwipeableViews axis="x" index={value} onChangeIndex={index => setValue(index)}>
            <TabContainer classes={classes}>
              <Typography variant="body1">
                {`In this step, you can drag and drop the sequence file on the indicated area, or click and choose from your computer. Right now the
                accepted file formats are ${(<b>.fa</b>)} and ${(<b>.txt</b>)}. Also we have a limitation of file size to ${(<b>10 megabytes</b>)}. 
                You can check the file that you selected to process right below the drag and drop zone. To change a sequence file, just select the new file or drop it
                in the indicated area.`}
              </Typography>
            </TabContainer>
            <TabContainer classes={classes}>
              <Typography variant="body1">
                In this step, you can choose the predictor tools that you want your sequence file to be processed. At this moment we have the
                <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4448272/" variant="body1" className={classes.link} target="_blank">
                  Mirinho
                </Link>
                and
                <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4408786/" variant="body1" className={classes.link} target="_blank">
                  miRBoost
                </Link>
                predictors, but we are always searching and working on adding more predictors to miRQuest 2, if you have a suggestion please get in
                touch.
              </Typography>
            </TabContainer>
            <TabContainer classes={classes}>
              <Typography variant="body1">
                In this step, you need to add your contact info, like name and e-mail, and then confirm the request, after wait for the request code,
                you can close the window or check the request status in the proper section.
              </Typography>
            </TabContainer>
            <TabContainer classes={classes}>
              <Typography variant="body1">
                <b>How much time do I have to wait for the request to be created?</b>
              </Typography>
              <Typography variant="body1" gutterBottom>
                The time that you have to wait for the request to be created depends on your internet connection and the file size that you are trying
                to upload, but it usually less than a minute and sometimes something between 1-5 minutes.
              </Typography>
              <Typography variant="body1">
                <b>How much time do I have to wait for the request to be processed?</b>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Usually something between 10-30 minutes, because of the e-mail delay and the Amazon process management.
              </Typography>
              <Typography variant="body1">
                <b>An error message appeared, what should I do??</b>
              </Typography>
              <Typography variant="body1">
                If something is not working properly or an error message showed up, please take a screenshot or copy the message that appeared and
                send to
                <Link href="mailto:marciogurkajr@gmail.com" variant="body1" style={{ textDecoration: 'none' }}>
                  marciogurkajr@gmail.com
                </Link>
              </Typography>
            </TabContainer>
          </SwipeableViews>
        </div>
      </DialogContent>
      <DialogActions>
        <Typography variant="caption" component="a" href="mailto:marciogurkajr@gmail.com" style={{ textDecoration: 'none' }}>
          {`Have other questions?? Send a message to ${(<i>marciogurkajr@gmail.com</i>)}`}
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

HelpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(helpDialogStyles)(HelpDialog);
