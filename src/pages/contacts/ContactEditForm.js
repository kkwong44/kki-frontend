//
// Edit contact details
// Only company record for now - it can develop futher in next release
//
import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ContactEditForm() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const currentUser = useCurrentUser();

  // Only company staff can access to this page
  const is_staff = currentUser?.staff;

  const [contactData, setContactData] = useState({
    id: "",
    depart_id: "",
    department: "",
    contact: "",
    address: "",
    town: "",
    county: "",
    postcode: "",
    telephone: "",
    email: "",
  });

  const {
    id,
    depart_id,
    department,
    contact,
    address,
    town,
    county,
    postcode,
    telephone,
    email,
  } = contactData;

  // Fetch contact details
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Get company data from the first record on the contacts list
        const { data: company } = await axiosReq.get(`/contacts`);
        const {
          id,
          depart_id,
          department,
          contact,
          address,
          town,
          county,
          postcode,
          telephone,
          email,
        } = company.results[0];

        setContactData({
          id,
          depart_id,
          department,
          contact,
          address,
          town,
          county,
          postcode,
          telephone,
          email,
        });
      } catch (err) {
        // console.log(err)
      }
    };
    handleMount();
  }, [id]);

  // Handle change in input fields
  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("depart_id", depart_id);
    formData.append("department", department);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("town", town);
    formData.append("county", county);
    formData.append("postcode", postcode);
    formData.append("telephone", telephone);
    formData.append("email", email);

    try {
      await axiosReq.put(`/contacts/${id}`, formData);
      history.goBack();
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Create form layout for input fields
  const textFields = (
    <div className="text-left">
      {/* Depart ID - readonly */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Department ID
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="depart_id"
            value={depart_id}
            onChange={handleChange}
            aria-label="department id"
            readOnly
          />
        </Col>
      </Form.Group>
      {errors.department?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Department input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Department
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="department"
            value={department}
            onChange={handleChange}
            aria-label="department name"
          />
        </Col>
      </Form.Group>
      {errors.department?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Contact name input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Contact
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="contact"
            value={contact}
            onChange={handleChange}
            aria-label="conatct name"
          />
        </Col>
      </Form.Group>
      {errors.contact?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Address input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Address
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            aria-label="address line"
          />
        </Col>
      </Form.Group>
      {errors.address?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Town input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Town
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="town"
            value={town}
            onChange={handleChange}
            aria-label="town"
          />
        </Col>
      </Form.Group>
      {errors.town?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* County input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          County
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="county"
            value={county}
            onChange={handleChange}
            aria-label="county"
          />
        </Col>
      </Form.Group>
      {errors.county?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Postcode input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Postcode
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="postcode"
            value={postcode}
            onChange={handleChange}
            aria-label="postcode"
          />
        </Col>
      </Form.Group>
      {errors.postcode?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Telephone input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          telephone
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="telephone"
            value={telephone}
            onChange={handleChange}
            aria-label="telephone"
          />
        </Col>
      </Form.Group>
      {errors.telephone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Email input */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            aria-label="email"
          />
        </Col>
      </Form.Group>
      {errors.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container className={`${appStyles.Content} py-2 p-0 p-md-2 mt-3`}>
          <h1 className="text-center mb-3">Company Detail</h1>
          {is_staff ? (
            <div>{textFields}</div>
          ) : (
            <div className="text-center">
              Only administrator can access to this page.
            </div>
          )}
          {is_staff ? (
            <div className="text-right mb-2">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                save
              </Button>
            </div>
          ) : null}
        </Container>
      </Form>
    </>
  );
}

export default ContactEditForm;
