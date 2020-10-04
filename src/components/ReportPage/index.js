import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Grid, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { toast } from 'react-toastify';
import RequestInfoDialog from './RequestInfoDialog';
import client from '~/client';
import RequestList from './RequestList';
import Loader from './Loader';
import { Container, FormTitle } from './styles';

const ReportPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
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

  return (
    <Container container>
      <RequestInfoDialog openRequestInfoDialog={openRequestInfoDialog} closeCallback={closeRequestInfoDialog} requestRecord={selectedRecord} />
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box textAlign="center" mb={1}>
            <FormTitle variant="h5" component="h1">
              Report search
            </FormTitle>
          </Box>
          <Box display="flex" mt={2} mb={2}>
            <TextField
              onChange={ev => setSearch(ev.target.value)}
              onKeyDown={handleSearch}
              value={search}
              label="Search"
              placeholder="Please put your code or e-mail in this box"
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
          </Box>

          {searching && <Loader searching={searching} />}

          {!searching && results.length === 0 && (
            <Box display="flex" flex={1} justifyContent="center" alignItems="center">
              <Typography variant="caption" align="center">
                No results available, please enter your search above.
              </Typography>
            </Box>
          )}

          {!searching && results.length > 0 && (
            <RequestList
              results={results}
              search={search}
              setOpenRequestInfoDialog={setOpenRequestInfoDialog}
              setSelectedRecord={setSelectedRecord}
            />
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default ReportPage;
