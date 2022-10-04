//
// 404 Page not found
//
import React from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import NoResults from "../assets/no-results.png";
import Asset from "./Asset";

function Code404() {
  return (
    <Container>
      <Card className="text-center">
        <Card.Header className="h1">404</Card.Header>
        <Card.Body>
          <Card.Title>Page Not Found</Card.Title>
            <div>
              <Asset
                src={NoResults}
                message="Sorry, the page you're looking for doesn't exist."
              />
              <p>If the problem persists please email our support team.</p>
              <a
                href={"mailto:kk@kkimages.co.uk"}
                aria-label="Open email client in a new window."
              >
                kk@kkimages.co.uk
              </a>
            </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Code404;
