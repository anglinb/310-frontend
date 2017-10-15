import React from 'react';
import StyledButton from './StyledButton';

import { shallow } from 'enzyme';
import sinon from 'sinon';

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
})


it('acts like a button', () => {
  let spy = sinon.spy()
  const wrapper = shallow(
    <StyledButton
      title={`Winning`}
      onPress={spy}
     />
  )
  expect(wrapper.find('Text').dive().text()).toEqual('Winning')
  wrapper.find('TouchableHighlight').forEach( child => {
    child.simulate('press') 
  })
  expect(spy.calledOnce).toBe(true)
})

