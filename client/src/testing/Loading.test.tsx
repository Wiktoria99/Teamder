import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Loading } from '@/components';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

it('Loading renders without crashing', () => {
  shallow(<Loading />);
});
