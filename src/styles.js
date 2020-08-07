import styled from 'styled-components';

const drawerWidth = 240;

export const Container = styled.div`
  display: flex;
  height: auto;
  min-height: 100%;
  position: relative;
`;

export const Main = styled.main`
  flex-grow: 1;
  padding: 15px;
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  overflow: auto;
  margin-bottom: 40px;
  margin-top: 64px;
  margin-left: ${props => (props.open ? drawerWidth : 0)}px;
`;
