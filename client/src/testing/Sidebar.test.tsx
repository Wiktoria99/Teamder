import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Sidebar } from '@/components';

//TEST #1
it('Sidebar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Sidebar />
    </Router>,
    div,
  );
});

it('Sidebar matches snapshot', () => {
  const tree = renderer
    .create(
      <Router>
        <Sidebar />
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

//TEST NAVLINK
it('NavLink matches snapshot', () => {
  const context = {};
  const tree = renderer
    .create(
      <StaticRouter location="loc" context={context}>
        <NavLink to="#" />
      </StaticRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
