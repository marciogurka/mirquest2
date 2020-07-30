import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './AppFooter.css';
import { appFooterStyle } from './AppFooter.style';

const AppFooter = props => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Typography variant="caption" align="center">
        Made with
        <FavoriteIcon className="heart" />
        by
        <a href="http://marciogurka.com" target="_blank" rel="noopener noreferrer" className="profile-link">
          Márcio Gurka
        </a>
      </Typography>
    </footer>
  );
};

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appFooterStyle)(AppFooter);
