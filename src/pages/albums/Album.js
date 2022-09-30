//
// Individual Album Detail
// Handle Likes, edit and delete album
//
import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
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
    updated_at,
    albumPage,
    setAlbums,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // Edit owner's album
  const handleEdit = () => {
    history.push(`/albums/${id}/edit`);
  };

  // Edit owner' album
  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/albums/${id}`);
      history.goBack();
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
              <span>{updated_at}</span>
              {is_owner && albumPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
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
              overlay={<Tooltip>You can't like your own album!</Tooltip>}
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
          <Link to={`/albums/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
          <Link to={`/albums/${id}`}>
            <i className="far fa-image" />
          </Link>
          {photos_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Album;
