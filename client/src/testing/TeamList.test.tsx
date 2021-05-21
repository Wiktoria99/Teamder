import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { TeamItem, TeamList } from '@/components';

it('TeamItem renders without crashing', () => {
  const team = {
    host: '',
    photoSource: '',
    title: '',
    date: '',
    location: '',
    maxSize: 5,
    curSize: 2,
    interests: [],
  };
  const div = document.createElement('div');
  ReactDOM.render(<TeamItem team={team} />, div);
});

it('TeamItem matches snapshot', () => {
  const team = {
    host: '',
    photoSource: '',
    title: '',
    date: '',
    location: '',
    maxSize: 5,
    curSize: 2,
    interests: [],
  };
  const tree = renderer.create(<TeamItem team={team} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('TeamList renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TeamList />, div);
});

it('TeamList matches snapshot', () => {
  const tree = renderer.create(<TeamList />).toJSON();
  expect(tree).toMatchSnapshot();
});
