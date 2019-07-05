import React from 'react';
import Chess from './Chess';
import { shallow, mount } from 'enzyme';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      const wrapper = shallow(<Chess />);
      expect(wrapper.contains(<div className="thing" />)).toEqual(true);
    });
});