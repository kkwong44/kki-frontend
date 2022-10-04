//
// Contact Page
// First record returned always the Company details
//
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

import btnStyles from "../../styles/Button.module.css";
import hero from "../../assets/hero.jpg";

function ContactPage() {
  const [contacts, setContacts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const history = useHistory();
 
  // Only company staffs allow to edit contact details
  // Use the first record from contacts
  const is_staff = currentUser?.staff;
  const company = contacts.results[0];

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: contacts } = await axiosReq.get(`/contacts`);
        setContacts(contacts);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, []);

  return (
    <>
      <Container className="text-center mt-3">
        <Card>
          <Card.Header className="h3">Contact us</Card.Header>
          <Card.Body>
            <Card.Title className="h5">{company?.department}</Card.Title>
            <p>
              {company?.address} <br />
              {company?.town} <br />
              {company?.county} <br />
              {company?.postcode}
            </p>
            <p>t: {company?.telephone}</p>
            <a
              href={`mailto:${company?.email}`}
              aria-label="Open email client in a new window."
            >
              {company?.email}
            </a>
          </Card.Body>
          {/* Only show edit button for company staffs */}
          {is_staff ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue} mb-3`}
              onClick={() => history.push(`/contacts/edit`)}
            >
              Edit
            </Button>
          ) : null}
          {/* Departments Table */}
          <div className="ml-5 mr-5">
            <Table striped bordered responsive="md">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Contact</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {contacts.results.map((contact) => (
                  <tr>
                    <td>{contact.department}</td>
                    <td>{contact.contact}</td>
                    <td>{contact.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <br />
          {/* Hero Image */}
          <Card.Img variant="bottom" src={hero} alt="hero image" />
        </Card>
      </Container>
    </>
  );
}

export default ContactPage;
