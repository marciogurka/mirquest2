import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './AppFooter.css';
import { appFooterStyle } from './AppFooter.style';

export class AppFooter extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={ classes.footer }>
        <Typography variant="caption" align="center">
          Made with
          <FavoriteIcon className="heart"/>
          by 
          <a href="http://marciogurka.com" target="_blank" rel="noopener noreferrer" className="profile-link">Márcio Gurka</a>
        </Typography>
      </footer>
    );
  }
}

export default withStyles(appFooterStyle)(AppFooter);