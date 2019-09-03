import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import { reportPageStyles } from './ReportPage.style';

import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const override = css `
    display: block;
    margin: 0 auto;
`;

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      searching: false,
    }
  }

  handleSearch = (ev) => {
    if(ev.key === "Enter" || ev.key === "enter") {
      const { search } = this.state;
      if (search) {
        this.setState({
          results: [],
          searching: true
        });
        const params = {
          q: search
        };
        axios.get(`http://localhost:8000/api/request_records/request_info/`, {
          params
        })
          .then(response => {
            this.setState({
              searching: false,
              results: response.data
            });
            return response;
          })
          .catch((error) => {
            this.setState({
              searching: false
            });
            console.error(error);
            toast.error("Ops! Something went wrong, please try again later!", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          });
      } else {
        toast.warn("Please insert some text in the search box", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    } else {
      return;
    }
  }

  render() {
    const { classes } = this.props;
    const { results, search, searching } = this.state;
    const handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };
    return (
        <Grid container spacing={16} className={classes.root}>
          <Grid item xs={12} className={classes.bodyList}>
            <Typography variant="title" gutterBottom align="center"> Report search </Typography>
            <TextField
              onChange={handleChange('search')}
              onKeyDown={this.handleSearch}
              value={search}
              id="outlined-full-width"
              label="Search"
              placeholder="Please put your code or e-mail in this box"
              style={{ margin: 8 }}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Do search"
                      onClick={this.handleSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {
              (!searching && results.length > 0) ? 
                (
                  <List className={classes.list}>
                    <ListSubheader>Results for search: </ListSubheader>
                    {
                      results.map((item, index) => {
                          return (<ListItem alignItems="flex-start" button key={index}>
                            <ListItemIcon>
                              <BookmarkIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.requestCode}
                              secondary={
                                <React.Fragment>
                                  <Typography component="span" className={classes.inline} color="textPrimary">
                                    {item.status} - {item.tool.name}
                                  </Typography>
                                  {` - Requested by: ${item.userEmail}`}
                                </React.Fragment>
                              }
                            />
                          </ListItem>)
                      })
                    }
                  </List>
                )
                : 
                null
            }

            {
              (!searching && results.length === 0) ? 
              <Typography variant="body1" gutterBottom align="center"> No results available </Typography>
              :
              null
            }
            {
              (searching) ?
                  <div className="sweet-loading" >
                    < RingLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={searching}
                        gutterBottom
                      />
                      <Typography variant="h5" gutterBottom> Searching... </Typography>
                  </div> 
                : null
            }
            
          </Grid>
        </Grid>
    );
  }
}

ReportPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(reportPageStyles)(ReportPage);
