import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios'
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends React.Component{

    state = {
      name: '',
      email: '',
      birthday: '',
      userHandle: '',
      password: '',
      checkbox: '',
    }

    handleChange = event => {
      this.setState({ name: event.target.value });
      this.setState({ email: event.target.value });
      this.setState({ birthday: event.target.value });
      this.setState({ userHandle: event.target.value });
      this.setState({ password: event.target.value });
      this.setState({ checkbox: event.target.value });
    }

    handleSubmit = event => {
      event.preventDefault();

      const user = {
        name: this.state.name,
        email: this.state.email,
        birthday: this.state.birthday,
        userHandle: this.state.userHandle,
        password: this.state.password,
        checkbox: this.state.password
      };

      axios.post(`http://10.0.0.94:3001/profile/addProfile`, { user })
        .then(res => {
          console.log(res);
          console.log(res.data);
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
              <Input type="text" placeholder="MM-DD-YYYY" name="birthday" onChange={this.handleChange}/>
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
          <Button type="submit">Sign Up!</Button>
          </Form>
      </div>
    )
  }
}

export default SignUp;