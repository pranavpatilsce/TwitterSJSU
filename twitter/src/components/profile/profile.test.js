import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UserProfileHome from './profile.js';
import ProfileTopBar from './profile.js';
import Navigation from './profile.js';
import ProfileCard from './profile.js';
import RightSide from './profile.js';

describe('Profile page loaded well', () => {

  it('Profile page loaded well', () => {
        const component = shallow(<UserProfileHome />);
        console.log(component.debug());
        const wrapper = component.find('.Profile');
        expect(wrapper.length).toBe(1);
  });
//
//   <ProfileTopBar/>
//   <ProfileCard/>
// <div className="Profile-RightSide">
//   <RightSide />
// </div>
// </div>
  it('Profile navigation loaded well', () => {
        const component = shallow(<div className="Profile-Navigation">
          <Navigation />
        </div>);
        console.log(component.debug());
        const wrapper = component.find('.Profile-Navigation');
        expect(wrapper.length).toBe(1);
        expect(wrapper.contains(<Navigation/>)).toEqual(true);
  });

  it('Profile right side loaded well', () => {
        const component = shallow(<div className="Profile-RightSide">
          <RightSide />
        </div>);
        console.log(component.debug());
        const wrapper = component.find('.Profile-RightSide');
        expect(wrapper.length).toBe(1);
        expect(wrapper.contains(<RightSide/>)).toEqual(true);
  });

  it('Profile top bar loaded well', () => {
        const component = shallow(<div className="Profile"><ProfileTopBar /></div>);
        console.log(component.debug());
        const wrapper = component.find('.Profile');
        expect(wrapper.length).toBe(1);
        expect(wrapper.contains(<ProfileTopBar/>)).toEqual(true);
  });

  it('Profile card loaded well', () => {
        const component = shallow(<div className="Profile"><ProfileCard /></div>);
        console.log(component.debug());
        const wrapper = component.find('.Profile');
        expect(wrapper.length).toBe(1);
        expect(wrapper.contains(<ProfileCard/>)).toEqual(true);
  });
  
});
