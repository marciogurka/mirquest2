import styled from 'styled-components';
import { AppBar, Typography } from '@material-ui/core';

const drawerWidth = 240;

export const CustomAppBar = styled(AppBar)`
  margin-left: ${props => (props.open ? drawerWidth : 0)}px;
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  width: ${props => (props.open ? `calc(100% - ${drawerWidth}px)` : `100%`)};
`;

export const Title = styled(Typography)`
  flex-grow: 1;
`;
