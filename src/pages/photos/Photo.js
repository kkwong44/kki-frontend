//
// Individual photo layout and allow owner delete
//
import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Avatar from "../../components/Avatar";
import styles from "../../styles/Photo.module.css";

import DeleteConfirmation from "../../components/DeleteConfirmation";

const Photo = (props) => {
  const {
    id,
    profile_id,
    profile_image,
    owner,
    title,
    photo_image,
    setAlbum,
    setPhotos,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Handle the displaying of the modal and message
  const showDeleteModal = () => {
    setDeleteMessage("Are you sure you want to delete this photo?");
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle delete of photo
  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/photos/${id}`);
      setAlbum((prevAlbum) => ({
        results: [
          {
            ...prevAlbum.results[0],
            photos_count: prevAlbum.results[0].photos_count - 1,
          },
        ],
      }));

      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.filter((photo) => photo.id !== id),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    // Rendering individual photo
    <div>
      <Card>
        {/* Photo card header */}
        <Card.Body className={styles.Photo}>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              {/* Show delete button to owner's photo */}
              {is_owner ? (
                <Button
                  className={btnStyles.Button}
                  onClick={() => showDeleteModal()}
                  type="button"
                >
                  Delete
                </Button>
              ) : null}
            </div>
          </Media>
        </Card.Body>
        {/* Photo id */}
        <small className="text-center text-muted mt-3">site image id: {id}</small>
        {/* Photo image */}
        <div className="text-center">
          <Card.Img src={photo_image} alt={title} className={styles.Border} />
        </div>
        {/* Photo reference / description */}
        <Card.Body className={`mt-3 ${styles.Photo}`}>
          <div className="text-center text-muted small">Photo Ref:</div>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
        </Card.Body>
      </Card>
      <br></br>
      {/* Confirm to delete photo */}
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={handleDelete}
        hideModal={hideConfirmationModal}
        message={deleteMessage}
      />
    </div>
  );
};

export default Photo;
