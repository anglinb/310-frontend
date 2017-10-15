import React from 'react';
import StyledButton from './StyledButton';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
    <StyledButton
      title={`Winning`}
      onPress={() => {
        console.log('eyu')
      }}
     />
  ).toJSON()
  expect(rendered).toBeTruthy()
  expect(rendered).toMatchSnapshot()
});
