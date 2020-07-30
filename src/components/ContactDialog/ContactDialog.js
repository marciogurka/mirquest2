import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { contactDialogStyles } from './ContactDialog.style';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ContactDialog = props => {
  const { classes, open, onClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={ev => onClose(ev)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Contact us!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" component="div">
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Márcio J. Gurka Jr.
                  </Typography>
                  <Typography
                    className={classes.noTextDecoration}
                    component="a"
                    variant="subtitle1"
                    color="textSecondary"
                    href="mailto:marciogurkajr@gmail.com?subject=miRQuest%202%20Contact"
                  >
                    marciogurkajr@gmail.com
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="textSecondary">
                    PPGCC - UTFPR
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="textSecondary">
                    Ponta Grossa - Paraná - Brazil
                  </Typography>
                  <Typography
                    className={classes.noTextDecoration}
                    component="a"
                    variant="subtitle2"
                    color="textSecondary"
                    href="http://lattes.cnpq.br/8848670390208515"
                  >
                    Lattes
                  </Typography>
                </CardContent>
              </div>
              <Avatar alt="Douglas Domingues" src="./marcio_gurka.jpeg" className={classes.bigAvatar} />
            </Card>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Simone Nasser M.
                  </Typography>
                  <Typography
                    className={classes.noTextDecoration}
                    component="a"
                    variant="subtitle1"
                    color="textSecondary"
                    href="mailto:snasser@utfpr.edu.br?subject=miRQuest%202%20Contact"
                  >
                    snasser@utfpr.edu.br
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="textSecondary">
                    PPGCC - UTFPR
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="textSecondary">
                    Ponta Grossa - Paraná - Brazil
                  </Typography>
                  <Typography
                    className={classes.noTextDecoration}
                    component="a"
                    variant="subtitle2"
                    color="textSecondary"
                    href="http://lattes.cnpq.br/2608583610949216"
                  >
                    Lattes
                  </Typography>
                </CardContent>
              </div>
              <Avatar alt="Douglas Domingues" src="./simone_matos.jpg" className={classes.bigAvatar} />
            </Card>
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    Alexandre R. Paschoal
                  </Typography>
                  <Typography
                    className={classes.noTextDecoration}
                    component="a"
                    variant="subtitle1"
                    color="textSecondary"
                    href="mailto:paschoal@utfpr.edu.br?subject=miRQuest%202%20Contact"
                  >
                    paschoal@utfpr.edu.br
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="textSecondary">
                    PPGBIOINFO - UTFPR
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="textSecondary">
                    Londrina - Paraná - Brazil
                  </Typography>
                  <Typography
                    className={classes.noTextDecoration}
                    component="a"
                    variant="subtitle2"
                    color="textSecondary"
                    href="http://lattes.cnpq.br/5834088144837137"
                  >
                    Lattes
                  </Typography>
                </CardContent>
              </div>
              <Avatar alt="Alexandre Paschoal" src="./alexandre_paschoal.jpeg" className={classes.bigAvatar} />
            </Card>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ContactDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(contactDialogStyles)(ContactDialog);
