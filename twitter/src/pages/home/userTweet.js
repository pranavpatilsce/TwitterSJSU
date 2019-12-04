import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';



import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

const Tweet = (props) => {

  const tweets = [
   
  ]

  return (
    <div>
      {tweets.map((twt, index) =>
        <div>
          <Card>
            <CardImg top width="100%" src={twt.image} alt="Card image cap" />
            <CardBody>
              <CardTitle key={twt.name + "-" + index} >{twt.name}</CardTitle>
              <CardSubtitle>{twt.subtitle}</CardSubtitle>
              <CardText>{twt.text}</CardText>
              <Button color = "secondary" href={twt.github}>Github</Button> {' '}
              <Button color = "primary" href={twt.linkedin}>LinkedIn</Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Tweet;
