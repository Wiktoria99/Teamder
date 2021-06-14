import { shallow } from "enzyme";
import { SideBarButton } from '@/components';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

it('SideBarButton renders without crashing', () => {
  shallow(<SideBarButton />);
});
