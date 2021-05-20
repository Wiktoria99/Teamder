import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, NavLink} from 'react-router-dom';
// import { StaticRouter } from 'react-router'
// import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { NotificationItem, NotificationList } from '@/components';


it('NotificationItem renders without crashing', () => {
  const notif= {
    person: '',
    photoSource: '',
    title: '',
  };
  const div = document.createElement('div');
  ReactDOM.render(<NotificationItem notification={notif}/> , div);
});

it('NotificationItem matches snapshot', () => {
  const notif= {
    person: '',
    photoSource: '',
    title: '',
  };
  const tree = renderer.create(<NotificationItem notification={notif}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('NotificationList renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotificationList /> , div);
});

it('NotificationList matches snapshot', () => {
  const tree = renderer.create(<NotificationList />).toJSON();
  expect(tree).toMatchSnapshot();
});
