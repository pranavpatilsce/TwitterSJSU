import React, {useState} from 'react';
import {Button} from 'reactstrap';
import './signup.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";

import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

let options = {};
options = {
    place: 'tc',
    message: (
        <div>
            <div>
            <p align="center">Signup success!</p>
            </div>
        </div>
    ),
    type: "success",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}

class SignUp extends React.Component{

    state = {
      name: '',
      email: '',
      birthDate: '',
      userHandle: '',
      password: '',
      checkbox: '',
    }

    handleChange = event => {
      // this.setState({ name: event.target.value });
      // this.setState({ email: event.target.value });
      // this.setState({ birthDate: event.target.value });
      // this.setState({ userHandle: event.target.value });
      // this.setState({ password: event.target.value });
      // this.setState({ checkbox: event.target.value });
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
  
      console.log('State status', this.state)
    }

    handleSubmit = event => {
      event.preventDefault();
console.log('Inside signup !!!!!!!!!!!!!!!111111')
      const user = {
        name: this.state.name,
        email: this.state.email,
        birthDate: this.state.birthDate,
        userHandle: this.state.userHandle,
        password: this.state.password
      };
      console.log('Inside signup usersssssssssssssss is !!!!!!!!!!!!!!!111111',user)
      axios.post('/profile/addProfile', user)
        .then(res => {
          console.log(res);
          console.log(res.data);
          localStorage.setItem('name', this.state.name);
          localStorage.setItem('email', this.state.email);
          localStorage.setItem('birthDate', this.state.birthDate);
          localStorage.setItem('userHandle', this.state.userHandle);
          this.refs.notify.notificationAlert(options);
      })
    }

    render(){

      return(
        <div>
           <NotificationAlert ref="notify" />
          <Form onSubmit={this.handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Enter Twitter Account Name" name="name" onChange={this.handleChange}/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" placeholder="password placeholder" name="email" onChange={this.handleChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
            <FormGroup>
              <Label>Birth Date</Label>
              <Input type="text" placeholder="MM-DD-YYYY" name="birthDate" onChange={this.handleChange}/>
            </FormGroup>
            </Col>
              <Col md={6}>
              <FormGroup>
              <Label>Address</Label>
              <Input type="textarea " placeholder="Enter Address" name="location" onChange={this.handleChange}/>
            </FormGroup>
              </Col>
              </Row>
            <FormGroup>
              <Label>User Handle</Label>
              <Input type="text" placeholder="Enter what you would like your Twitter handle to be. Example: @earth" name="userHandle" onChange={this.handleChange}/>
            </FormGroup>
            <Col md={6}>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            {/*
            <FormGroup check>
              <Input type="checkbox" name="checkbox" onChange={this.handleChange}/>
              <Label>I understand terms and conditions.</Label>
            </FormGroup>*/}
          <Button type="submit">Sign Up!</Button>
          </Form>
      </div>
    )
  }
}

export default SignUp;
