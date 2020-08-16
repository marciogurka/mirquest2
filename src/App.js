import React, { useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import AppDrawer from './components/AppDrawer';
import ContactDialog from './components/ContactDialog';
import Routes from './routes';
import { Container, Main } from './styles';

const App = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Router>
      <StylesProvider injectFirst>
        <Container>
          <ContactDialog open={openDialog} onClose={handleDialogClose} />
          <AppHeader open={open} handleDrawerOpen={handleDrawerOpen} handleDialogOpen={handleDialogOpen} />
          <AppDrawer open={open} handleDrawerClose={handleDrawerClose} />
          <Main open={open}>
            <Routes />
          </Main>
          <AppFooter />
        </Container>
      </StylesProvider>
    </Router>
  );
};

export default App;
