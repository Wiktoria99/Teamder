import React from 'react';
import ReactDOM from 'react-dom';
import { CustomTextField } from '@/components';

//TEST #1
it('CustomTextField renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomTextField />, div);
});
