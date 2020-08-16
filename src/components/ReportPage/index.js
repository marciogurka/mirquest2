import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListSubheader
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { toast } from 'react-toastify';
import RequestInfoDialog from './RequestInfoDialog/RequestInfoDialog';
import client from '~/client';
import theme from '~/theme';
import { Loader, LoaderContainer, Container } from './styles';

const ReportPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([{ status: 'none', requestCode: uuidv4() }]);
  const [searching, setSearching] = useState(false);
  const [openRequestInfoDialog, setOpenRequestInfoDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const handleSearch = ev => {
    if (ev.key === 'Enter' || ev.key === 'enter' || !ev.key) {
      if (search) {
        setResults([]);
        setSearching(true);
        const params = {
          q: search
        };
        client
          .get(`/api/request_records/request_info/`, {
            params
          })
          .then(response => {
            setResults(response.data);
            setSearching(false);
            return response;
          })
          .catch(error => {
            setSearching(false);
            console.error(error);
            toast.error('Ops! Something went wrong, please try again later!', {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          });
      } else {
        toast.warn('Please insert some text in the search box', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    } else if (results.length) {
      setResults([]);
    }
  };

  const closeRequestInfoDialog = () => {
    setOpenRequestInfoDialog(false);
    setSelectedRecord(null);
  };

  const openRequestDetails = index => {
    if (results[index] && results[index].status.toLowerCase().localeCompare('processed') === 0) {
      setOpenRequestInfoDialog(true);
      setSelectedRecord(results[index]);
    } else if (results[index] && results[index].status.toLowerCase().localeCompare('processing') === 0) {
      toast.info('This request is still processing!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      toast.error('Ops! Something went wrong, please try again later!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  return (
    <Container container>
      <RequestInfoDialog openRequestInfoDialog={openRequestInfoDialog} closeCallback={closeRequestInfoDialog} requestRecord={selectedRecord} />
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" height="100%">
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Report search
          </Typography>
          <TextField
            onChange={ev => setSearch(ev.target.value)}
            onKeyDown={handleSearch}
            value={search}
            label="Search"
            placeholder="Please put your code or e-mail in this box"
            style={{ marginBottom: 20, marginTop: 10 }}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Do search" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {!searching && results.length > 0 ? (
            <List>
              <ListSubheader>{`Results for search "${search}":`}</ListSubheader>
              {results.map((item, index) => {
                return (
                  <ListItem alignItems="flex-start" button key={uuidv4()} onClick={ev => openRequestDetails(index)}>
                    <ListItemIcon>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.requestCode} />
                  </ListItem>
                );
              })}
            </List>
          ) : null}

          {!searching && results.length === 0 ? (
            <Typography variant="body1" gutterBottom align="center">
              No results available
            </Typography>
          ) : null}
          {searching ? (
            <LoaderContainer>
              <Loader sizeUnit="px" size={150} color={theme.palette.primary.main} loading={searching} gutterBottom />
              <Typography variant="h5" gutterBottom>
                Searching...
              </Typography>
            </LoaderContainer>
          ) : null}
        </Box>
      </Grid>
    </Container>
  );
};

export default ReportPage;
