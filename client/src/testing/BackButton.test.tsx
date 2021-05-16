import React from 'react';
import ReactDOM from 'react-dom';
import { BackButton } from '@/components';
import { Router } from '@material-ui/icons';

it('BackButton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <BackButton pathname={'/test'} />
    </Router>,
    div,
  );
});
