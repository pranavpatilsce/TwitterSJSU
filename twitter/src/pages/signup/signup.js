import React, {useState} from 'react';
import {Button} from 'reactstrap';
import './signup.css';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

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
      this.setState({ name: event.target.value });
      this.setState({ email: event.target.value });
      this.setState({ birthDate: event.target.value });
      this.setState({ userHandle: event.target.value });
      this.setState({ password: event.target.value });
      this.setState({ checkbox: event.target.value });
    }

    handleSubmit = event => {
      event.preventDefault();

      const user = {
        name: this.state.name,
        email: this.state.email,
        birthDate: this.state.birthDate,
        userHandle: this.state.userHandle,
        password: this.state.password
      };

      axios.post('/profile/addProfile', { user })
        .then(res => {
          console.log(res);
          console.log(res.data);
          localStorage.setItem('name', this.state.name);
          localStorage.setItem('email', this.state.email);
          localStorage.setItem('birthDate', this.state.birthDate);
          localStorage.setItem('userHandle', this.state.userHandle);
      })
    }

    render(){

      return(
        <div>
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
            <FormGroup>
              <Label>Birth Date</Label>
              <Input type="text" placeholder="MM-DD-YYYY" name="birthDate" onChange={this.handleChange}/>
            </FormGroup>
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
          <Button type="submit" href="/">Sign Up!</Button>
          </Form>
      </div>
    )
  }
}

export default SignUp;
