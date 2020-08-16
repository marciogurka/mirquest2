import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, FormGroup, Grid, Button, Divider, FormHelperText } from '@material-ui/core';
import TextInput from './TextInput';
import FileInput from './FileInput';
import CheckboxInput from './CheckboxInput';
import { predictionTools } from './ToolChooseData';
import { Container, FooterContainer, FormTitle } from './styles';

const AppForm = () => {
  const options = predictionTools.filter(tool => !tool.disabled);
  const formikConfig = {
    initialValues: {
      file: null,
      selectedTools: [],
      email: '',
      name: ''
    },
    validationSchema: Yup.object().shape({
      file: Yup.mixed().required('You need to select a file'),
      selectedTools: Yup.array().required('You need to choose at least one tool'),
      email: Yup.string()
        .email('Please insert a valid e-mail')
        .required('Please insert your e-mail'),
      name: Yup.string().required('Please insert your name')
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
    }
  };
  return (
    <Container elevation={3}>
      <Formik {...formikConfig}>
        {formProps => {
          const { values, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = formProps;
          return (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Box textAlign="center" mb={2}>
                  <FormTitle variant="h5">miRQuest 2 Process File</FormTitle>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <FileInput label="Choose a FASTA or text file" name="file" onChange={handleChange} buttonLabel="Choose a file" />
                  </Grid>
                  <Grid item xs={12}>
                    <CheckboxInput
                      label="Please select the tools that will process the data"
                      name="selectedTools"
                      onChange={handleChange}
                      options={options}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider variant="middle" style={{ flex: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormHelperText>Contact Info</FormHelperText>
                    <TextInput label="Your Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput label="Your E-mail" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                  </Grid>
                </Grid>
              </FormGroup>
              <FormFooter handleReset={handleReset} dirty={dirty} isSubmitting={isSubmitting} />
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};

AppForm.propTypes = {
  selectedTools: PropTypes.array.isRequired
};

const FormFooter = ({ handleReset, dirty, isSubmitting }) => {
  return (
    <FooterContainer>
      <Button type="button" variant="outlined" onClick={handleReset} disabled={!dirty || isSubmitting}>
        Reset
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        Submit
      </Button>
    </FooterContainer>
  );
};

FormFooter.propTypes = {
  handleReset: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    selectedTools: store.requestRecord.selectedTools
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppForm);
