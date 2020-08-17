import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const Container = styled(Paper)`
  flex: 1;
  padding: 15px;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

export const FormTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 0;
  text-align: center;
`;
