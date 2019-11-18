import React from 'react';
import { shallow } from 'enzyme';
import LogIn from './login.js';


//const wrapper = shallow(<LogIn />);

describe('LogIn', () => {

  it('LogIn page loaded well', () => {

        const component = shallow(<LogIn />);
        console.log(component.debug());
        const wrapper = component.find('.Login');
        expect(wrapper.length).toBe(1);

    // const wrapper = shallow((
    //   <LogIn>
    //     <div className="Login" />
    //   </LogIn>
    // ));
    // expect(wrapper.contains(<div className="Login" />)).to.equal(true);
  });

  it('LogIn logo loaded', () => {

        const component = shallow(<LogIn />);
        console.log(component.debug());
        const logo = component.find('.Login-Navigation');
        expect(logo.length).toBe(1);
  });

  it('LogIn signin loaded', () => {

        const component = shallow(<LogIn />);
        console.log(component.debug());
        const rightside = component.find('.Login-RightSide');
        expect(rightside.length).toBe(1);
  });

});
