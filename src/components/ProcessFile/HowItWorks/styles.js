import styled from 'styled-components';
import { Paper, Link, Typography, ListItemText } from '@material-ui/core';

export const Container = styled(Paper)`
  flex: 1;
  padding: 15px;
`;

export const InfoContainer = styled.span`
  display: flex;
  > span {
    text-align: justify;
  }
`;

export const CustomLink = styled(Link)`
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const FormTitle = styled(Typography)`
  font-weight: bold;
`;

export const ToolName = styled.i`
  margin: 0 4px;
`;

export const ReferenceText = styled.span`
  display: flex;
  margin: 0;
  text-align: justify;
`;

export const CustomListItemText = styled(ListItemText)`
  margin: 0;
`;
