//
// Individual Album Detail
// Handle Likes, edit and delete album
//
import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Link, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

import Avatar from "../../components/Avatar";
import DeleteConfirmation from "../../components/DeleteConfirmation";

import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Album.module.css";

const Album = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    photos_count,
    likes_count,
    like_id,
    title,
    content,
    cover_image,
    category_filter,
    skill_level,
    updated_at,
    albumPage,
    setAlbums,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Handle the displaying of the modal and message
  const showDeleteModal = () => {
    setDeleteMessage("Are you sure you want to delete this album?");
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Edit owner's album
  const handleEdit = () => {
    history.push(`/albums/${id}/edit`);
  };

  // Delete owner' album
  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/albums/${id}`);
      history.push("/");
    } catch (err) {
      // console.log(err)
    }
  };

  // Like album
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { album: id });
      setAlbums((prevAlbums) => ({
        ...prevAlbums,
        results: prevAlbums.results.map((album) => {
          return album.id === id
            ? { ...album, likes_count: album.likes_count + 1, like_id: data.id }
            : album;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Unlike album
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setAlbums((prevAlbums) => ({
        ...prevAlbums,
        results: prevAlbums.results.map((album) => {
          return album.id === id
            ? { ...album, likes_count: album.likes_count - 1, like_id: null }
            : album;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    // Render album as a card
    <Card className={styles.Album}>
      <Card.Body>
        {/* Header */}
        <Card.Body className={styles.Header}>
          {/* User profile */}
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            {/* Date last updated and show menu for album's owner */}
            <div className="d-flex align-items-center">
              <span className="pr-1 d-none d-sm-block">
                <small>{updated_at}</small>
                <br />
                <small className="text-muted">Last updated</small>
              </span>
              {is_owner && albumPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={() => showDeleteModal()}
                />
              )}
            </div>
          </Media>
          <span className="pr-1 d-block d-sm-none text-left mt-3">
            <small className="text-muted">Last updated: </small>
            <small className="text-muted">{updated_at}</small>
          </span>
        </Card.Body>
      </Card.Body>
      {/* Album id */}
      <div className="text-center mb-2">Album #{id}</div>
      {/* Album cover image */}
      <Link to={`/albums/${id}`}>
        <Card.Img src={cover_image} alt={title} className={styles.Border} />
      </Link>
      {/* Album's title, category and description */}
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {category_filter && (
          <Card.Text>
            <small className="text-muted">{category_filter} Photography</small>
          </Card.Text>
        )}
        {content && <Card.Text>{content}</Card.Text>}

        {/* Handle and show likes and counts  */}
        <div className={styles.AlbumBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t like your own album!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like albums!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}

          {comments_count === 0 ? (
            <Link to={`/albums/${id}/comments`}>
              <i className="far fa-comments" />
              {`${comments_count} `}
            </Link>
          ) : (
            <Link to={`/albums/${id}/comments`}>
              <i className="fas fa-comments" />
              {comments_count}
            </Link>
          )}

          {photos_count === 0 ? (
            <Link to={`/albums/${id}`}>
              <i className="far fa-image" />
              {photos_count}
            </Link>
          ) : (
            <Link to={`/albums/${id}`}>
              <i className="fas fa-image" />
              {photos_count}
            </Link>
          )}
          {skill_level === "Other" ? (
            <Card.Text>
              <small className="text-muted">Photos taken by General Photographer</small>
            </Card.Text>
          ) : (
            <Card.Text>
              <small className="text-muted">Photos taken by {skill_level} Photographer</small>
            </Card.Text>
          )}
        </div>
      </Card.Body>

      {/* Confirm to delete album */}
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={handleDelete}
        hideModal={hideConfirmationModal}
        message={deleteMessage}
      />
    </Card>
  );
};

export default Album;
