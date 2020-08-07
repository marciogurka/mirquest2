import styled from 'styled-components';
import { Card, Avatar, DialogContent } from '@material-ui/core';

export const Container = styled(DialogContent)`
  margin-bottom: 20px;
`;

export const ContactCard = styled(Card)`
  display: flex;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 15px;
`;

export const ContactCardContent = styled(Card)`
  flex: 1 0 auto;
  padding-bottom: 0;
`;
export const CustomAvatar = styled(Avatar)`
  height: 100%;
  margin: 10px 20px;
  max-height: 150px;
  max-width: 150px;
  width: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 5px 0px;
`;
