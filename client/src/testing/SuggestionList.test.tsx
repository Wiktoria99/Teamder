import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { SuggestionItem, SuggestionList } from '@/components';

it('SuggestionItem renders without crashing', () => {
  const interest = {
    name: '',
    teams_number: 100,
  };
  const div = document.createElement('div');
  ReactDOM.render(<SuggestionItem interest={interest} />, div);
});

it('SuggestionItem matches snapshot', () => {
  const interest = {
    name: '',
    teams_number: 100,
  };
  const tree = renderer.create(<SuggestionItem interest={interest} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('SuggestionList renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SuggestionList />, div);
});

it('SuggestionList matches snapshot', () => {
  const tree = renderer.create(<SuggestionList />).toJSON();
  expect(tree).toMatchSnapshot();
});
