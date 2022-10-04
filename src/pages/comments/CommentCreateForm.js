//
// Create comments form to allow add comments to album
//
import React, { useState } from "react";

import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentCreateForm(props) {
  const { album, setAlbum, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  // Handle change in comment field
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        album,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setAlbum((prevAlbum) => ({
        results: [
          {
            ...prevAlbum.results[0],
            comments_count: prevAlbum.results[0].comments_count + 1,
          },
        ],
        
      }));
      setContent("");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      {/* Form layout with current user profile image */}
      <div className="text-center"><strong>Add comments</strong></div>
      <hr />
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          {/* Comment field */}
          <Form.Control
            aria-label="Add comment"
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {/* Post button */}
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;