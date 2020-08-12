import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProcessFile from './components/ProcessFile';
import StartPage from './components/StartPage';
import ReportPage from './components/ReportPage/ReportPage';

const Routes = () => {
  return (
    <Switch>
      <Route path="/process" component={ProcessFile} />
      <Route path="/report" component={ReportPage} />
      <Route component={StartPage} />
    </Switch>
  );
};

export default Routes;
