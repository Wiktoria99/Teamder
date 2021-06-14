import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { SuggestionItem, SuggestionList } from '@/components';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

const interest = {
  name: '',
  id: 1,
};

it('SuggestionItem renders without crashing', () => {
  shallow(<SuggestionItem interest={interest}/>);
});

it('SuggestionItem matches snapshot', () => {
  const tree = shallow(<SuggestionItem interest={interest}/>);
  expect(toJson(tree)).toMatchSnapshot();
});

it("accepts SuggestionItem props", () => {
  const wrapper = mount(<SuggestionItem interest={interest}/>);
  expect(wrapper.props().interest).toEqual(interest);
});

it('SuggestionList renders without crashing', () => {
  shallow(<SuggestionList/>);
});

it('SuggestionList matches snapshot', () => {
  const tree = shallow(<SuggestionList/>);
  expect(toJson(tree)).toMatchSnapshot();
});
