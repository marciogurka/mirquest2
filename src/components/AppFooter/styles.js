import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const Footer = styled.footer`
  background-color: #3f51b5b5;
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
  color: #dedede;
  display: flex;
  font-size: 12px;
`;

export const ProfileLink = styled.a`
  color: #dedede;
  padding-left: 5px;
  text-decoration: none;
`;

export const HeartIcon = styled(FavoriteIcon)`
  color: #de1111;
  font-size: 15px;
  padding: 0px 3px;
  width: 1.15em;
`;
