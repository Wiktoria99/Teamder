import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { BasicInfo, CustomTextField, CustomButton } from '@/components';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

const request = {
  user_name: 'test',
  password: 'test',
  password2: 'test',
  name: 'test',
  surname: 'test',
  email: 'test',
  location: 'test',
  age: 2,
  photo_src: 'test',
  bio: 'test',
  social_media_URL1: 'test',
  social_media_URL2: 'test',
  social_media_URL3: 'test',
  list_of_interests: ['test'],
};

it('BasicInfo renders without crashing', () => {
  shallow(<Router><BasicInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/></Router>);
});

it('BasicInfo matches snapshot', () => {
  const tree = shallow(<Router><BasicInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/></Router>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("find button and textfields", () => {
  const wrapper = mount(<Router><BasicInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/></Router>);
  expect(wrapper.find(CustomTextField).length).toBe(8);
  expect(wrapper.contains(CustomButton)).toBe(true);
});