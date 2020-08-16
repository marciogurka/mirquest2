import styled from 'styled-components';
import { Paper, Typography, Grid } from '@material-ui/core';

export const Container = styled(Paper)`
  background-color: red;
  flex-grow: 1;
  height: 100%;
  max-width: 100%;
  position: relative;
`;

export const BackgroundImage = styled.div`
  background-image: url('./bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: -1;
`;

export const CustomGrid = styled(Grid)`
  height: 100%;
  margin: 0 auto;
  padding: 15px;
`;

export const HeroGrid = styled(Grid)`
  flex: 0;
  margin-bottom: 10px;
`;

export const ContentGrid = styled(Grid)`
  flex: 1;
`;

export const TextGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export const HeroTitle = styled(Typography)`
  font-weight: bold;
`;

export const Title = styled(Typography)`
  font-weight: 500;
  margin-bottom: 5px;
`;

export const Text = styled(Typography)`
  margin-bottom: 10px;
  text-align: justify;
`;

export const DnaImg = styled.img`
  border-radius: 20px;
  width: 100%;
`;

export const DNAGrid = styled(Grid)`
  align-items: center;
  display: flex;
  padding: 15px;
`;

export const ButtonGrid = styled(Grid)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
`;
