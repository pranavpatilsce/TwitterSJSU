import React from 'react';
import {Button} from 'reactstrap';
//import logo from '../../svg/logo.svg';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';
//import MagnifyingSearch from '../../svg/search_100px.svg';

class RightSide extends React.Component {
  searchHandler = (e) => {
    if (e.key === 'Enter') {
      alert('works');
    }
  }
  render(){
    return(
      <div className="search-div">
        <div>
          <Form>
          <FormGroup>
            <Input className="search-bar" type="text" name="address" placeholder="Search a trend or person" onKeyDown={this.searchHandler}></Input>
          </FormGroup>
          </Form>
          {/* <input type="text"> Search People or Trends </input>*/}
        </div>

      </div>
    )
  }
}

export default RightSide;
