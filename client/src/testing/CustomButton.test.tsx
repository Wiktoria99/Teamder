import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { CustomButton } from '@/components';
import { colors } from '@/styles';

afterEach(cleanup);

// TEST #1
it('CustomButton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomButton>Test</CustomButton>, div);
});

// TEST #2
it('CustomButton renders correctly', () => {
  const { getByTestId } = render(
    <CustomButton
      data-testid="custom-button"
      onClick={() => console.log('do something')}
    >
      Test
    </CustomButton>,
  );
  expect(getByTestId('custom-button').textContent).toBe('Test');
});

// TEST #3
it('CustomButton matches snapshot', () => {
  const tree = renderer.create(<CustomButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
