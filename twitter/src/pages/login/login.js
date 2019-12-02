import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import {Button} from 'reactstrap';
import logo from '../../svg/loginBird.svg';
import logo2 from '../../svg/loginBird.svg';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Redirect} from 'react-router';
let email=null, password=null, redirectVar=null;

class LogIn extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={email:'',password:'', authFlag:false}
  }
   emailChangeHandler=(e)=>{
    this.setState({email:e.target.value})
  }
   passwordChangeHandler=(e)=>{
    this.setState({password:e.target.value})
  }
   loginUser=()=>{
    let data = {email:this.state.email,password:this.state.password};
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    console.log('her ein the signin',data);
    axios.post('http://localhost:3001/profile/signInProfile',data)
      .then((response) => {
          console.log('response ok',response.data)
          console.log("Status Code : ", response);
          if(response.data=='credentials not Match')
          {
            alert("Invalid credentials");
          }
          else if (response.data!='credentials not Match' && response.data!="error") 
          {
            // alert("Login Success!");
            //set local storage
            console.log('Success!!!',response.data)
            localStorage.setItem('name',response.data.name)
            localStorage.setItem('email',response.data.email)
            localStorage.setItem('id',response.data._id)
            localStorage.setItem('userHandle',response.data.userHandle)
            localStorage.setItem('chats',response.data.chats)
          }
          else if(response.data=="error")
          {
              alert("Server Error");
          }
          this.setState({});
      })
      .catch (response => {
          alert("Invalid");
          this.setState({});
        }
      )
  }
   
  render(){
    if(localStorage.getItem('email'))
      redirectVar=<Redirect to='/home'/>
    else
      redirectVar=<Redirect to='/'/>
  return (    
    <div className="Login">
      {redirectVar}
      <img className="Login-Navigation" src={logo}/>
        {/*<img className="Login-Navigation-Bird" src={logo} />*/}

      <div className="Login-RightSide">
      <div className="SignInAndPasswordMount">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="email" name="email" id="exampleEmail" onChange={this.emailChangeHandler} placeholder="Email" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="password" name="password" id="examplePassword" onChange={this.passwordChangeHandler} placeholder="Password" />
          </FormGroup>
          <Button onClick={this.loginUser.bind(this)} className="LogIn-RightSide-InLine">Log in</Button>
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
      </div>

    </div>
    )
  }
}

export default LogIn;
