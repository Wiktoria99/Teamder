import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { shallow} from "enzyme";
import { CustomTextField } from '@/components';

afterEach(cleanup);

it('CustomTextField renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomTextField />, div);
});

it('CustomText renders correctly', () => {
  const wrapper = shallow(<CustomTextField value="testing" />);
  expect(wrapper.props().value).toEqual('testing');
});

it('CustomButton matches snapshot', () => {
  const tree = renderer.create(<CustomTextField />).toJSON();
  expect(tree).toMatchSnapshot();
});
