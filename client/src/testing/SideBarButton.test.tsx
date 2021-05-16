import React from 'react';
import ReactDOM from 'react-dom';
import { SideBarButton } from '@/components';

//TEST #1
it('SideBarButton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarButton />, div);
});
