import React from 'react';
import Badge from './badge';
import { shallow } from 'enzyme';

describe('Badge', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Badge />)

    it('should receive value prop', () => {
      wrapper.setProps({ value: 10 })
      expect(wrapper.props().value).toEqual(10)
    })

    it('should receive theme prop', () => {
      wrapper.setProps({ theme: 'secondary' })
      expect(wrapper.props().theme).toEqual('secondary')
    })
  })
})
