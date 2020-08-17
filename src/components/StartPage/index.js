import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Tooltip, Hidden, Box } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';

import { DNAGrid, BackgroundImage, CustomGrid, HeroTitle, DnaImg, ButtonGrid, TextGrid, Title, Text, ContentGrid } from './styles';

const StartPage = () => {
  return (
    <>
      <BackgroundImage />
      <CustomGrid container item direction="column" component={Paper} xs={12} sm={11} alignContent="flex-start">
        <Box textAlign="center" mb={2} mt={1}>
          <HeroTitle variant="h4" component="h1">
            Welcome to miRQuest2
          </HeroTitle>
        </Box>
        <ContentGrid container item xs={12}>
          <TextGrid item xs={12} md={6}>
            <Title variant="h5" component="h2">
              What is miRQuest 2?
            </Title>
            <Text variant="body1" component="p">
              In the last years, a lot has evolved in the subject of the molecular structure of the organisms, the speed and facility of processing
              these structures leads for another problem, process the giant amount of data and analyze the results of the different organisms genomes
              that are used for research.
            </Text>
            <Text variant="body1" component="p">
              The micro RNA is are molecules of usually 22 nucleotides that helps the regulation of the gene expression. The deregulation of the micro
              RNA have an important role in the manifestation of some diseases such as cancer. So, being able to process and predict some micro RNA
              chains is a key process to understand and help detect potential hairpins generated from the genome.
            </Text>
            <Text variant="body1" component="p">
              However, analyzing miRNA sequencing data is challenging. Significant computational resources and bioinformatics expertise are needed.
              Several analytical tools have been developed over the past few years. That leads for having a lot of tools for specific species or chain
              process method.
            </Text>
            <Text variant="body1" component="p">
              miRQuest 2 is a web based application that integrates a few microRNA predictors tools and allow the user to process the same file
              between multiple predictors at the same time.
            </Text>
            <Title variant="h5" component="h2">
              How it works??
            </Title>
            <Text variant="body1" component="p">
              You can choose between the
              <b> "Process Your Data" </b>
              option, where you can upload a microRNA sequence, then choose between the available predictors (at the moment we have
              <i> Mirinho </i>
              and
              <i> miRBoost)</i>, add your contact info and start the process of the chain.
            </Text>
            <Text variant="body1" component="p">
              After that you can check the
              <b> "Check a Report" </b>
              option, where you can search using your request code or email to check and download the results.
            </Text>
          </TextGrid>

          <DNAGrid item xs={12} md={6}>
            <ButtonGrid item xs={12}>
              <Tooltip title="Start processing your biological sequence" arrow>
                <Box mt={1} mb={1}>
                  <Button variant="contained" fullWidth color="primary" size="large" component={Link} to="/process" startIcon={<TimelineIcon />}>
                    Process your data
                  </Button>
                </Box>
              </Tooltip>
              <Tooltip title="Check a created request status and results" arrow>
                <Box mt={1} mb={1}>
                  <Button variant="contained" color="primary" fullWidth size="large" component={Link} to="/report" startIcon={<BarChartIcon />}>
                    Check a report
                  </Button>
                </Box>
              </Tooltip>
            </ButtonGrid>
            <Hidden only={['xs', 'sm']}>
              <DnaImg src="./dna.gif" alt="Chain gif" />
            </Hidden>
          </DNAGrid>
        </ContentGrid>
      </CustomGrid>
    </>
  );
};

export default StartPage;
