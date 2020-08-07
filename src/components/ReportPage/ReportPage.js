import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import './ReportPage.css';

import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import { toast } from 'react-toastify';
import RequestInfoDialog from './RequestInfoDialog/RequestInfoDialog';
import { reportPageStyles } from './ReportPage.style';
import 'react-toastify/dist/ReactToastify.css';
import client from '../../client';

const override = css`
  display: block;
  margin: 0 auto;
`;

const ReportPage = props => {
  const { classes } = props;
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
    <Grid container className={classes.root}>
      <RequestInfoDialog openRequestInfoDialog={openRequestInfoDialog} closeCallback={closeRequestInfoDialog} requestRecord={selectedRecord} />
      <Grid item xs={12} className={classes.bodyList}>
        <Typography variant="h6" gutterBottom align="center">
          Report search
        </Typography>
        <TextField
          onChange={ev => setSearch(ev.target.value)}
          onKeyDown={handleSearch}
          value={search}
          id="outlined-full-width"
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
          <List className={classes.list}>
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
          <div className="sweet-loading">
            <RingLoader css={override} sizeUnit="px" size={150} color="#123abc" loading={searching} gutterBottom />
            <Typography variant="h5" gutterBottom>
              Searching...
            </Typography>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
};

ReportPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(reportPageStyles)(ReportPage);
