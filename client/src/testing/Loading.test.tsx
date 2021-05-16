import React from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@/components';

//TEST #1
it('Loading renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loading />, div);
});
