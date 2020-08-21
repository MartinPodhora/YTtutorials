import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CarouseButton from '../components/FizzBuzz/CarouseButton';
import { iteratee, wrap } from 'lodash';

configure({ adapter: new Adapter() });

describe('CarouselButton', () => {
  const text = 'some text';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CarouseButton>{test}</CarouseButton>);
  });

  it('renders a <button>', () => {
    expect(wrapper.type()).toBe('button');
  });

  it('passes children to the button', () => {
    expect(wrapper.prop('children')).toBe('text');
  });
});
