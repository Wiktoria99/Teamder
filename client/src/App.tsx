import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from '@/routing';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Routing />
    </Router>
  );
};

export default App;
