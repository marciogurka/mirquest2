import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { toast } from 'react-toastify';

const ReportPage = props => {
  const { search, results, setOpenRequestInfoDialog, setSelectedRecord } = props;

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
    <List>
      <ListSubheader>{`Results for search "${search}":`}</ListSubheader>
      {results.map((item, index) => {
        return (
          <ListItem alignItems="flex-start" button key={uuidv4()} onClick={ev => openRequestDetails(index)}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <span>
                  <span>Request code: </span>
                  <b>{item.requestCode}</b>
                </span>
              }
              secondary={
                <span>
                  <span>
                    Requested by: {item.nome || 'Not informed'} {item.email ? `(${item.email})` : ''}
                  </span>
                  <span> {item.data ? `- Created at: ${moment(item.data).format('MM-DD-YYYY HH:mm')}` : ''}</span>
                </span>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

ReportPage.propTypes = {
  search: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  setOpenRequestInfoDialog: PropTypes.func.isRequired,
  setSelectedRecord: PropTypes.func.isRequired
};

export default ReportPage;
