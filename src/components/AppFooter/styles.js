import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import theme from '~/theme';

export const Footer = styled.footer`
  background-color: ${theme.palette.primary.light};
  bottom: 0;
  display: flex;
  height: 40px;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  width: 100%;
`;

export const FooterText = styled.span`
  align-items: center;
  color: ${theme.palette.primary.contrastText};
  display: flex;
  font-size: 12px;
`;

export const ProfileLink = styled.a`
  color: ${theme.palette.primary.contrastText};
  font-style: italic;
  padding-left: 5px;
  text-decoration: none;
`;

export const HeartIcon = styled(FavoriteIcon)`
  color: #de1111;
  font-size: 15px;
  padding: 0px 3px;
  width: 1.15em;
`;
