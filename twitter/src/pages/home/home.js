import React from 'react';
import {Button} from 'reactstrap';
import logo from '../../svg/logo.svg';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../nav/globalNav.js';
import RightSide from '../../components/search/search.js';


import Pranav from '../../svg/Pranav.jpeg';
import Kalyani from '../../svg/Kalyani.jpeg';
import Mukesh from '../../svg/Mukesh.jpeg';
import Kartik from '../../svg/Kartik.png';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


const Profile = (props) => {

  const people = [
    {
      name: "Pranav Patil",
      image: Pranav,
      subtitle: "MS Software Engineering",
      text: "Worked on React, Flask server, and ML.",
      github: "https://github.com/pranavpatilsce",
      linkedin: "https://www.linkedin.com/in/pranavrpatil/"
    },
    {
      name: "Mukesh Mogal",
      image: Mukesh,
      subtitle: "MS Software Engineering",
      text: "Worked on Python backend, AI theory, and ML",
      github: "https://github.com/MukeshMogal",
      linkedin: ""
    },{
      name: "Kalyani Deshmukh",
      image: Kalyani,
      subtitle: "MS Software Engineering",
      text: "Worked on Tableau, Python backend, and ML.",
      github: "https://github.com/kalyanideshmukh11",
      linkedin: ""
    },{
      name: "Kartik Ulmarkar",
      image: Kartik,
      subtitle: "MS Software Engineering",
      text: "Worked on Flask server, Twitter API, and ML.",
      github: "https://github.com/kartiksjsu",
      linkedin: ""
    }
  ]

  return (
    <div>
      {people.map((peop, index) =>
        <div>
          <Card>
            <CardImg top width="100%" src={peop.image} alt="Card image cap" />
            <CardBody>
              <CardTitle key={peop.name + "-" + index} >{peop.name}</CardTitle>
              <CardSubtitle>{peop.subtitle}</CardSubtitle>
              <CardText>{peop.text}</CardText>
              <Button color = "secondary" href={peop.github}>Github</Button> {' '}
              <Button color = "primary" href={peop.linkedin}>LinkedIn</Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};


function Home() {
  return (
    <div className="Home">

      <div className="Home-Navigation">
        <Navigation />
      </div>

      <div className="Home-Home">
        <div className="Home-Home-Card" jumbotron-fluid>
            <Profile />
        </div>
        {/* <img src={logo} alt="logo" /> */}
      </div>

      <div className="Home-RightSide">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
