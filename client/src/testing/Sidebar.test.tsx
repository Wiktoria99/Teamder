import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Sidebar } from '@/components';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

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

it('NavLink to my_profile matches snapshot', () => {
  const context = {};
  const tree = renderer
    .create(
      <StaticRouter location="loc" context={context}>
        <NavLink to="/my_profile" />
      </StaticRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('NavLink to mainpage matches snapshot', () => {
  const context = {};
  const tree = renderer
    .create(
      <StaticRouter location="loc" context={context}>
        <NavLink to="/" />
      </StaticRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('NavLink to my_teams matches snapshot', () => {
  const context = {};
  const tree = renderer
    .create(
      <StaticRouter location="loc" context={context}>
        <NavLink to="/my_teams" />
      </StaticRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('NavLink to notifications matches snapshot', () => {
  const context = {};
  const tree = renderer
    .create(
      <StaticRouter location="loc" context={context}>
        <NavLink to="/notifications" />
      </StaticRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
