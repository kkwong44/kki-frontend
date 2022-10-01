//
// Link to comments page for mobile devices
//
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";

const CommentMobile = ({ mobile, id }) => {

  return (
    <Container
      // Check mobile or desktop
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {mobile ? (
        <Link to={`/albums/${id}/comments`}>comments</Link>
      ) : (
        <div>Desktop</div>
      )}
    </Container>
  );
};

export default CommentMobile;
