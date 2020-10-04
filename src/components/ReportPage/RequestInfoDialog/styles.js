import styled from 'styled-components';
import { TextField, AppBar, Typography, DialogContent, Grid } from '@material-ui/core';

export const CustomAppBar = styled(AppBar)`
  position: relative;
`;

export const ResultTextArea = styled(TextField)`
font-family: monospace
  font-size: 12px;
`;

export const RequestInfo = styled(Typography)`
  display: flex;
`;

export const DialogContainer = styled(DialogContent)`
  padding: 0;
`;

export const InfoGrid = styled(Grid)`
  margin: 0;
  max-width: 100%;
`;
