import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { CustomTextField, CustomButton } from '@/components';
import { Login } from "@/pages";
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

it('Login renders without crashing', () => {
  shallow(<Router><Login /></Router>);
});

it('Login matches snapshot', () => {
  const tree = shallow(<Router><Login/></Router>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("find button and textfields", () => {
  const wrapper = mount(<Router><Login/></Router>);
  expect(wrapper.find(CustomTextField).length).toBe(2);
  expect(wrapper.contains(CustomButton)).toBe(true);
});