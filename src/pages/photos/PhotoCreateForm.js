//
// Create an Photo form
//
import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PhotoCreateForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function PhotoCreateForm(props) {
  // const { album, setAlbum, setPhoto, profileImage, profile_id } = props;
  const { album } = props;

  const [errors, setErrors] = useState({});

  const [photoData, setPhotoData] = useState({
    title: "",
    photo_image: "",
  });

  const { title, photo_image } = photoData;
  const imageInput = useRef(null);
  const history = useHistory();
  
  // Handle change in input fields
  const handleChange = (event) => {
    setPhotoData({
      ...photoData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle change in image upload
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(photo_image);
      setPhotoData({
        ...photoData,
        photo_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("album", album);
    formData.append("photo_image", imageInput.current.files[0]);

    try {
      await axiosReq.post("/photos/", formData);
      history.push(`/albums/${album}`, setPhotoData({title:'', photo_image: ''}));
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Create form layout for input and button fields
  const textFields = (
    <div className="text-center">
      {/* Album title input */}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Cancel and create buttons */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.push(`/albums/${album}`, setPhotoData({title:'', photo_image: ''}))}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        add
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Rendering form layout */}
        <Col className="py-2 p-0 p-md-2"  lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            {/* Upload photo image area */}
            <Form.Group className="text-center">
              {photo_image ? (
                <>
                  <figure>
                    <Image
                      className={appStyles.Image}
                      src={photo_image}
                      rounded
                    />
                  </figure>
                  <div>
                    <Form.Label
                      className={`&(btnStlyes.Button) ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload your photo"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors.photo_image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* TextFields for mobile devices */}
            <div className="d-md-block">{textFields}</div>
          </Container>
        </Col>
        {/* TextFields for large devices */}
        {/* <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col> */}
      </Row>
    </Form>
  );
}

export default PhotoCreateForm;
