import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Button, DialogTitle, Typography, Grid } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PropTypes from 'prop-types';
import { Container, ContactCard, CardDetails, ButtonContainer, CustomAvatar } from './styles';

const ContactDialog = props => {
  const { open, onClose } = props;

  const infos = [
    {
      name: 'Márcio J. Gurka Jr.',
      email: 'marciogurkajr@gmail.com',
      mailLink: 'mailto:marciogurkajr@gmail.com?subject=miRQuest%202%20Contact',
      university: 'PPGCC - UTFPR',
      cityInfo: 'Ponta Grossa - Paraná - Brazil',
      lattesLink: 'http://lattes.cnpq.br/8848670390208515',
      photoSrc: './marcio_gurka.jpeg'
    },
    {
      name: 'Simone Nasser M.',
      email: 'snasser@utfpr.edu.br',
      mailLink: 'mailto:snasser@utfpr.edu.br?subject=miRQuest%202%20Contact',
      university: 'PPGCC - UTFPR',
      cityInfo: 'Ponta Grossa - Paraná - Brazil',
      lattesLink: 'http://lattes.cnpq.br/2608583610949216',
      photoSrc: './simone_matos.jpg'
    },
    {
      name: 'Alexandre R. Paschoal',
      email: 'paschoal@utfpr.edu.br',
      mailLink: 'mailto:paschoal@utfpr.edu.br?subject=miRQuest%202%20Contact',
      university: 'PPGBIOINFO - UTFPR',
      cityInfo: 'Londrina - Paraná - Brazil',
      lattesLink: 'http://lattes.cnpq.br/5834088144837137',
      photoSrc: './alexandre_paschoal.jpeg'
    }
  ];

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        keepMounted
        onClose={ev => onClose(ev)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Contact us!</DialogTitle>
        <Container>
          <Grid container spacing={2}>
            {infos.map(contact => (
              <Grid item xs={12} md={6} key={uuidv4()}>
                <ContactCard>
                  <CardDetails>
                    <Typography component="h5" variant="h5">
                      {contact.name}
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                      {contact.university}
                    </Typography>
                    <Typography component="p" variant="subtitle1" color="textSecondary">
                      {contact.cityInfo}
                    </Typography>
                    <ButtonContainer>
                      <Button
                        style={{ marginRight: 15 }}
                        variant="outlined"
                        color="primary"
                        size="small"
                        href={contact.lattesLink}
                        startIcon={<AssignmentIcon />}
                      >
                        Lattes
                      </Button>
                      <Button variant="contained" color="primary" size="small" href={contact.mailLink} startIcon={<ContactMailIcon />}>
                        Send an e-mail
                      </Button>
                    </ButtonContainer>
                  </CardDetails>
                  <CustomAvatar alt={contact.name} src={contact.photoSrc} />
                </ContactCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

ContactDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ContactDialog;
