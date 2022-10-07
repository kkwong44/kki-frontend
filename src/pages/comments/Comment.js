//
// Individual Comment Detail
// Handle edit and delete owner's comments
//
import React, { useState } from "react";

import Media from "react-bootstrap/Media";

import Avatar from "../../components/Avatar";
import DeleteConfirmation from "../../components/DeleteConfirmation";

import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/Comment.module.css";

import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setAlbum,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // Handle the displaying of the modal and message
  const showDeleteModal = () => {
    setDeleteMessage("Are you sure you want to delete this comment?");
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle delete comment
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setAlbum((prevAlbum) => ({
        results: [
          {
            ...prevAlbum.results[0],
            comments_count: prevAlbum.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {/* Show edit form to edit comment */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Check current user is comment's owner */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={() => showDeleteModal()}
          />
        )}
      </Media>
      <hr />

      {/* Confirm to delete comment */}
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={handleDelete}
        hideModal={hideConfirmationModal}
        message={deleteMessage}
      />
    </>
  );
};

export default Comment;
