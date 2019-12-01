import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Navigation from './home';
import Tweet from './home';
import RightSide from './home';
import { shallow } from 'enzyme';


describe('Home page loaded well', () => {

  it('Main home loaded well', () => {
        const component = shallow(<Home />);
        console.log(component.debug());
        const wrapper = component.find('.Home');
        expect(wrapper.length).toBe(1);
  });

  it('Nav loaded', () => {
        const component = shallow(
        <div className="Home-Navigation">
          <Navigation />
        </div>);
        console.log(component.debug());
        const navigation = component.find('.Home-Navigation');
        expect(navigation.length).toBe(1);
        expect(navigation.contains(<Navigation/>)).toEqual(true);
  });

  it('Tweet home background', () => {
        const component = shallow(
          <div className="Home-Home">
            <div className="Home-Home-Card" jumbotron-fluid>
                <Tweet />
            </div>
          </div>
        );
        console.log(component.debug());
        const tweetdiv = component.find('.Home-Home');
        const tweetjumbo = component.find('.Home-Home-Card')
        expect(tweetdiv.length + tweetjumbo.length).toBe(2);
        expect(tweetjumbo.contains(<Tweet/>)).toEqual(true);
  });

  it('Tweet loaded', () => {
        const component = shallow(
          <div className="Home-Home">
            <div className="Home-Home-Card" jumbotron-fluid>
            </div>
          </div>
        );
        console.log(component.debug());
        const tweetdiv = component.find('.Home-Home');
        const tweetjumbo = component.find('.Home-Home-Card')
        expect(tweetdiv.length + tweetjumbo.length).toBe(2);
        expect(tweetdiv.contains(<Tweet/>)).toEqual(false);
  });

  it('Rightside loaded well', () => {
        const component = shallow(
        <div className="Home-RightSide">
          <RightSide />
        </div>
        );
        console.log(component.debug());
        const rightside = component.find('.Home-RightSide');
        expect(rightside.length).toBe(1);
        expect(rightside.contains(<Tweet/>)).toEqual(true);
  });

});
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Home />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
