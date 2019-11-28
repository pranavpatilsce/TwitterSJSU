import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(), disableLifecycleMethods: true
});
