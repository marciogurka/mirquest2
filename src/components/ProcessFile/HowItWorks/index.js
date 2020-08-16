import React from 'react';
import { Box, Link, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Container, InfoContainer, CustomLink, FormTitle, ToolName, ReferenceText, CustomListItemText } from './styles';

const arrayHelper = [
  {
    primary: 'Choose the file that you want to process',
    secondary: (
      <InfoContainer>
        <span>
          You can upload a .txt or a .fa file, or download this
          <CustomLink href="/sample.fa"> sample file </CustomLink>
          or other sequence from
          <CustomLink href="http://www.mirbase.org"> http://www.mirbase.org </CustomLink>
        </span>
      </InfoContainer>
    )
  },
  {
    primary: 'Select the tools that will process the file',
    secondary: (
      <span>
        We have for now available
        <ToolName>Mirinho</ToolName>
        and
        <ToolName>miRBoost.</ToolName>
      </span>
    )
  },
  {
    primary: 'Fill the remaining fields',
    secondary: 'Put your name and e-mail that you want to receive the alerts from the process.'
  },
  {
    primary: 'Submit your form'
  },
  {
    primary: "That's it!",
    secondary: "You will receive a code right away and when it's done you will receive an e-mail."
  }
];

const referencesArray = [
  {
    name: 'Mirinho',
    reference:
      'Higashi, S., Fournier, C., Gautier, C., Gaspin, C., & Sagot, M. F. (2015). Mirinho: An efficient and general plant and animal pre-miRNA predictor for genomic and deep sequencing data. BMC bioinformatics, 16(1), 1-14.',
    link: 'https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-015-0594-0'
  },
  {
    name: 'miRBoost',
    reference:
      'Tempel, S., Zerath, B., Zehraoui, F., & Tahi, F. (2015). miRBoost: boosting support vector machines for microRNA precursor classification. RNA, 21(5), 775-785.',
    link: 'https://rnajournal.cshlp.org/content/21/5/775.short'
  },
  {
    name: 'miRQuest 2',
    reference:
      "Gurka Júnior, M. J. (2019). miRQuest 2: solução computacional para integração de ferramentas de predição de micro RNA utilizando balanceamento de carga (Master's thesis, Universidade Tecnológica Federal do Paraná).",
    link: 'http://repositorio.utfpr.edu.br/jspui/handle/1/4634'
  }
];

const ProcessFile = () => {
  return (
    <Container elevation={3}>
      <Box textAlign="center">
        <FormTitle variant="h5">How it works??</FormTitle>
      </Box>
      <List dense>
        {arrayHelper.map(item => (
          <ListItem key={uuidv4()}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={item.primary} secondary={item.secondary || ''} />
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" style={{ flex: 1 }} />
      <Box mt={2}>
        <Typography variant="h6">References</Typography>
      </Box>
      <List dense>
        {referencesArray.map(item => (
          <ListItem key={uuidv4()} button component={Link} href={item.link}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <CustomListItemText primary={item.name} secondary={<ReferenceText>{item.reference}</ReferenceText>} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProcessFile;
