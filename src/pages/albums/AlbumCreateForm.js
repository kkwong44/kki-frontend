//
// Create an album form
//
import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/AlbumCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

function AlbumCreateForm() {
  const [errors, setErrors] = useState({});

  const [albumData, setAlbumData] = useState({
    title: "",
    content: "",
    category_filter: "",
    cover_image: "",
  });

  const [categoryList, setCategoryList] = useState([
    { display_name: "", value: "" },
  ]);

  const { title, content, category_filter, cover_image } = albumData;
  const imageInput = useRef(null);
  const history = useHistory();

  // Fetch categories from backend
  useEffect(() => {
    const fetchData = async () => {
      const category = await axiosReq.options("/albums");
      setCategoryList(category.data.actions.POST.category_filter.choices);
    };
    fetchData();
  }, []);

  // Handle change in input fields
  const handleChange = (event) => {
    setAlbumData({
      ...albumData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle change in image upload
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(cover_image);
      setAlbumData({
        ...albumData,
        cover_image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_filter", category_filter);
    formData.append("cover_image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/albums/", formData);
      history.push(`/albums/${data.id}`);
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
        <Form.Label>Title</Form.Label>
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
      {/* Album category selection input */}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category_filter"
          value={category_filter}
          placeholder="General"
          onChange={handleChange}
        >
          {categoryList.map((category) => (
            <option value={category.value} key={category.value}>
              {category.display_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors.category_filter?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Album descripton input */}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Cancel and create buttons */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Rendering form layout */}
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            {/* Upload cover image area */}
            <Form.Group className="text-center">
              {cover_image ? (
                <>
                  <figure>
                    <Image
                      className={appStyles.Image}
                      src={cover_image}
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
                    message="Click or tap to upload an image"
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
            {errors.cover_image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* TextFields for mobile devices */}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        {/* TextFields for large devices */}
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default AlbumCreateForm;