import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '@/styles';
import { Routing } from '@/routing';
import { InterestsProvider } from '@/components';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <InterestsProvider>
        <ThemeProvider theme={theme.default}>
          <CssBaseline />
          <Routing />
        </ThemeProvider>
      </InterestsProvider>
    </Router>
  );
};

export default App;
