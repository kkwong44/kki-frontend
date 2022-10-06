//
// About page for KKImage
//
import React from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import hero from "../../assets/hero.jpg";

function AboutPage() {
  return (
    <>
      <Container className="mt-3">
        <Card>
          <Card.Body>
            <Card.Title>About KK Images</Card.Title>
            <hr />
            <Card.Text>
              KK Images is a free online service for photographers who want to
              showcase their works. There are no restrictions on the
              photographer's skills to register and post their works. Non
              photographers can also register to the site and follow the
              photographers. They can like and leave comments to the works
              posted by the photographers.
            </Card.Text>
            <Card.Text>
              The registered photographers on this sites can be contacted when
              they leave an email address in their profile page.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={hero} alt="hero image" />
        </Card>
      </Container>
    </>
  );
}

export default AboutPage;
