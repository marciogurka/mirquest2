import styled from 'styled-components';
import { Drawer, Avatar } from '@material-ui/core';

const drawerWidth = 240;

export const CustomDrawer = styled(Drawer)`
  flex-shrink: 0;

  & > div {
    width: ${drawerWidth}px;
  }
`;

export const DrawerHeader = styled.div`
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: flex-end;
  padding: 0 8px;
`;

export const MenuLogo = styled(Avatar)`
  margin-left: auto;
  margin-right: auto;
`;
