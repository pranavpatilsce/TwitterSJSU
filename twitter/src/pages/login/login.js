import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import {Button} from 'reactstrap';
import logo from '../../svg/loginBird.svg';
import logo2 from '../../svg/loginBird.svg';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignInAndPassword = (props) => {
  return (
    <div>
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input type="password" name="password" id="examplePassword" placeholder="Password" />
        </FormGroup>
        <Button href="/home" className="LogIn-RightSide-InLine">Log in</Button>
      </Form>
      <div>
        <img className="LogIn-RightSide-Bird" src={logo2} />
        <h1 className="LogIn-RightSide-Wording">See what’s happening in</h1>
        <h1 className="LogIn-RightSide-Wording">the world right now</h1>
        <h5 className="LogIn-RightSide-Wording">Join Twitter today.</h5>
        <div className="LogIn-RightSide-Button">
          <Button className="LogIn-RightSide-SignUp">Sign up</Button>
          <div className="LogIn-RightSide-LogIn-Padding">
            <Button className="LogIn-RightSide-LogIn">Log in</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

class LogIn extends React.Component {

  render(){
  return (
    <div className="Login">

      <img className="Login-Navigation" src={logo}/>
        {/*<img className="Login-Navigation-Bird" src={logo} />*/}

      <div className="Login-RightSide">
        <SignInAndPassword className="SignInAndPasswordMount"/>
      </div>

    </div>
    )
  }
}

export default LogIn;
