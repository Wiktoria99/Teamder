import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { AdditionalInfo, CustomTextField, CustomButton } from '@/components';
import { cleanup } from '@testing-library/react';

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

it('AdditionalInfo renders without crashing', () => {
  shallow(<AdditionalInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/>);
});

it('AdditionalInfo matches snapshot', () => {
  const tree = shallow(<AdditionalInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("accepts AdditionalInfo props", () => {
  const wrapper = mount(<AdditionalInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/>);
  expect(wrapper.props().registerInfo).toEqual(request);
  expect(wrapper.props().setRegisterInfo).toEqual('');
  expect(wrapper.props().updateProgressState).toEqual('');
});

it("find button and textfields", () => {
  const wrapper = mount(<AdditionalInfo registerInfo={request} setRegisterInfo='' updateProgressState=''/>);
  expect(wrapper.find(CustomTextField).length).toBe(5);
  expect(wrapper.contains(CustomButton)).toBe(true);
});
