import React from 'react';
import { shallow } from 'enzyme';
import LogIn from './login.js';
import SignInAndPassword from './login.js'

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

  it('LogIn signin div loaded', () => {

        const component = shallow(<LogIn />);
        console.log(component.debug());
        const rightside = component.find('.Login-RightSide');
        const rightsideTwo = component.find('.SignInAndPasswordMount');
        expect(rightside.length + rightsideTwo.length).toBe(2);
  });

  it('LogIn signin component loaded', () => {
        const component = shallow(
        <div className="Login-RightSide">
          <SignInAndPassword className="SignInAndPasswordMount"/>
        </div>);
        console.log(component.debug());
        const signincomponent = component.find('.Login-RightSide');
        expect(signincomponent.contains(<SignInAndPassword className="SignInAndPasswordMount"/>)).toEqual(true);
  });

});
