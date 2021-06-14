import { shallow, mount } from "enzyme";
import {
  ProfileInfo,
  EditProfile,
  SocialMedia,
  CustomButton,
  CustomTextField,
} from '@/components';
import toJson from "enzyme-to-json";
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

const profile = {
  id: 1,
  user_name: 'test',
  name: 'test',
  surname: 'test',
  email: 'test',
  location: 'test',
  age: 20,
  photo_src: 'test',
  bio: 'test',
  rating: 2,
  social_media_URL1: 'test',
  social_media_URL2: 'test',
  social_media_URL3: 'test',
  list_of_interests_id: [1,2],
};

it('EditInfo renders without crashing', () => {
  shallow(<EditProfile profile={profile}/>);
});

it('EditProfile matches snapshot', () => {
  const tree = shallow(<EditProfile profile={profile}/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it('SocialMedia renders without crashing', () => {
  shallow(<SocialMedia profile={profile} edit={true}/>);
});

it('NotificationItem matches snapshot', () => {
  const tree = shallow(<SocialMedia profile={profile} edit={true}/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it('ProfileInfo renders without crashing', () => {
  shallow(<ProfileInfo info={profile}/>);
});

it('NotificationItem matches snapshot', () => {
  const tree = shallow(<ProfileInfo info={profile}/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("accepts user account props", () => {
  const wrapper = mount(<ProfileInfo info={profile} />);
  expect(wrapper.props().info).toEqual(profile);
});

it("accepts user account props", () => {
  const wrapper = mount(<EditProfile profile={profile}/>);
  expect(wrapper.props().profile).toEqual(profile);
  expect(wrapper.find(CustomTextField).length).toBe(6);
  expect(wrapper.contains(CustomButton)).toBe(true);
});

it("find button and textfields", () => {
  const wrapper = mount(<EditProfile profile={profile}/>);
  expect(wrapper.find(CustomTextField).length).toBe(6);
  expect(wrapper.contains(CustomButton)).toBe(true);
});

it("accepts user account props", () => {
  const wrapper = mount(<SocialMedia profile={profile} edit={true}/>);
  expect(wrapper.props().profile).toEqual(profile);
});

it("find button and textfields", () => {
  const wrapper = mount(<SocialMedia profile={profile} edit={true}/>);
  expect(wrapper.contains(CustomButton)).toBe(true);
  wrapper.find(CustomButton).simulate('click');
  expect(wrapper.contains(CustomButton)).toBe(true);
});

it("accepts user account props", () => {
  const wrapper = mount(<SocialMedia profile={profile} edit={false}/>);
  expect(wrapper.props().profile).toEqual(profile);
  expect(wrapper.contains(CustomButton)).toBe(true);
});

it("find button and textfields", () => {
  const wrapper = mount(<SocialMedia profile={profile} edit={false}/>);
  expect(wrapper.contains(CustomButton)).toBe(true);
});