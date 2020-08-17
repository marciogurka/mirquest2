import styled from 'styled-components';
import RingLoader from 'react-spinners/RingLoader';

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
