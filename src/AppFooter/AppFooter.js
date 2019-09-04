import React from 'react';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './AppFooter.css';

export class AppFooter extends React.Component {
  render() {
    return (
      <footer>
        <Typography variant="caption" gutterBottom align="center">
          Made with
          <FavoriteIcon className="heart"/>
          by 
          <a href="http://marciogurka.com" target="_blank" rel="noopener noreferrer" className="profile-link">Márcio Gurka</a>
        </Typography>
      </footer>
    );
  }
}

export default (AppFooter);