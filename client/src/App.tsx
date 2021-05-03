import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from '@/styles';
import { Routing } from '@/routing';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme.default}>
        <CssBaseline />
        <Routing />
      </ThemeProvider>
    </Router>
  );
};

export default App;
