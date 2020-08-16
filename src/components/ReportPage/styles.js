import styled from 'styled-components';
import RingLoader from 'react-spinners/RingLoader';
import { Grid } from '@material-ui/core';

export const Container = styled(Grid)`
  padding: 15px;
`;

export const Loader = styled(RingLoader)`
  display: block;
  margin: 0 auto;
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
`;
