import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { NotificationItem, NotificationList, CustomButton } from '@/components';
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

const notif = {
  username: 'test',
  team_id: 1,
  person: profile,
};


it('NotificationItem renders without crashing', () => {
  shallow(<NotificationItem username="test" team_id={1} person={profile}/>);
});

it('NotificationItem matches snapshot', () => {
  const tree = shallow(<NotificationItem username="test" team_id={1} person={profile}/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("accepts NotificationItem props", () => {
  const wrapper = mount(<NotificationItem username="test" team_id={1} person={profile}/>);
  expect(wrapper.props().username).toEqual('test');
  expect(wrapper.props().team_id).toEqual(1);
  expect(wrapper.props().person).toEqual(profile);
});

it('NotificationList renders without crashing', () => {
  shallow(<NotificationList />);
});

it('NotificationList matches snapshot', () => {
  const tree = shallow(<NotificationList />);
  expect(toJson(tree)).toMatchSnapshot();
});
