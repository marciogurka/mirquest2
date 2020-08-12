import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import { Paper, Button, Grid, Tooltip, Hidden } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';

import { DNAGrid, BackgroundImage, CustomGrid, HeroTitle, DnaImg, ButtonGrid, TextGrid, Title, Text, HeroGrid, ContentGrid } from './styles';

const StartPage = props => {
  return (
    <>
      <BackgroundImage />
      <CustomGrid container direction="column" component={Paper} xs={12} sm={10} alignContent="flex-start">
        <HeroGrid item xs={12}>
          <HeroTitle component="h1" align="center">
            Welcome to miRQuest2
          </HeroTitle>
        </HeroGrid>
        <ContentGrid container item xs={12}>
          <TextGrid item xs={12} md={6}>
            <Title component="h2">What is miRQuest 2?</Title>
            <Text gutterBottom component="p">
              miRQuest 2 is a web based application that integrates a few microRNA predictors tools and allow the user to process the same file
              between multiple predictors at the same time.
            </Text>
            <Title component="h2">How it works??</Title>
            <Text gutterBottom component="p">
              You can choose between the "Process Your Data" option, where you can upload a microRNA sequence, then choose between the available
              predictors, add your contact info and process the sequence. After that you can check the "Check a Report" option, where you can search
              using your request code or email to check and download the results.
            </Text>
            <ButtonGrid item xs={12}>
              <Tooltip title="Start processing your biological sequence" arrow>
                <Button variant="contained" color="primary" size="large" component={Link} to="/process" startIcon={<TimelineIcon />}>
                  Process your data
                </Button>
              </Tooltip>
              <Tooltip title="Check a created request status and results" arrow>
                <Button variant="contained" color="primary" size="large" component={Link} to="/report" startIcon={<BarChartIcon />}>
                  Check a report
                </Button>
              </Tooltip>
            </ButtonGrid>
          </TextGrid>

          <Hidden only={['xs', 'sm']}>
            <DNAGrid item xs={12} md={6}>
              <DnaImg src="./dna.gif" alt="Chain gif" />
            </DNAGrid>
          </Hidden>
        </ContentGrid>
      </CustomGrid>
    </>
  );
};

StartPage.propTypes = {};

export default StartPage;
