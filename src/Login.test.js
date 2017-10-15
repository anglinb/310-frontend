
import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';

import renderer from 'react-test-renderer';
import Login from './Login';

it('renders without crashing', () => {
  const rendered = renderer.create(
    <Login />
  ).toJSON()
  expect(rendered).toBeTruthy()
  expect(rendered).toMatchSnapshot()
})
