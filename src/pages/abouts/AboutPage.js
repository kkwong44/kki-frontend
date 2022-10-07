//
// About page for KKImage
//
import React from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import hero from "../../assets/hero.jpg";

const AboutPage = () => {
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
              photographer&apos;s skills to register and post their works. Non
              photographers can also register to the site and follow the
              photographers. They can like and leave comments to the works
              posted by the photographers.
            </Card.Text>
            <Card.Text>
              This platform also can be used to share photography experiences,
              techniques, looking for a photographer and general discussions.
              The registered photographers on this site can be contacted when
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
