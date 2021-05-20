import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, NavLink} from 'react-router-dom';
// import { StaticRouter } from 'react-router'
// import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { ProfileInfo, EditProfile, SocialMedia, UserInterests } from '@/components';


it('EditInfo renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditProfile /> , div);
});


it('SocialMedia renders without crashing', () => {
  const links= {
    first: '',
    second: '',
    third: '',
  };
  const div = document.createElement('div');
  ReactDOM.render(<SocialMedia links={links}/> , div);
});

it('SocialMedia matches snapshot', () => {
  const links= {
    first: '',
    second: '',
    third: '',
  };
  const tree = renderer.create(<SocialMedia links={links}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('UserInterests renders without crashing', () => {
  const interests= [''];
  const div = document.createElement('div');
  ReactDOM.render(<UserInterests interests={interests}/> , div);
});

it('UserInterests matches snapshot', () => {
  const interests= [''];
  const tree = renderer.create(<UserInterests interests={interests}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ProfileInfo renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileInfo /> , div);
});