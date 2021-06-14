import { shallow} from "enzyme";
import {
  MainWrapper,
} from '@/components';
import toJson from "enzyme-to-json";
import { cleanup } from '@testing-library/react';

afterEach(cleanup);


it('EditInfo renders without crashing', () => {
  shallow(<MainWrapper />);
});

it("renders correctly", () => {
  const tree = shallow(<MainWrapper />);
  expect(toJson(tree)).toMatchSnapshot();
});
