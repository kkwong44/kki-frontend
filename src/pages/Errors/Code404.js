//
// 404 Page not found  
//
import React from "react";
import { Card, Container } from "react-bootstrap";

function Code404() {
  return (
    <Container>
      <Card className="text-center">
        <Card.Header className="h1">404</Card.Header>
        <Card.Body>
          <Card.Title>Page Not Found</Card.Title>
          <p>If the problem persists please email our support team.</p>
          <a
            href={"mailto:kk@kkimages.co.uk"}
            aria-label="Open email client in a new window."
          >
            kk@kkimages.co.uk
          </a>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Code404;
