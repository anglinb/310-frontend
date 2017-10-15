import React from 'react';
import StyledTextInput from './StyledTextInput';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import renderer from 'react-test-renderer';

it('renders without crashing w/o label', () => {
  const rendered = renderer.create(
    <StyledTextInput
     />
  ).toJSON()
  expect(rendered).toBeTruthy()
  expect(rendered).toMatchSnapshot()
})

it('renders without crashing w/ label', () => {
  const rendered = renderer.create(
    <StyledTextInput
      labelText={`Label`}
     />
  ).toJSON()
  expect(rendered).toBeTruthy()
  expect(rendered).toMatchSnapshot()
})