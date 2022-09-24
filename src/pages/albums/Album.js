import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
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

  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Album}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && albumPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/albums/${id}`}>
        <Card.Img src={cover_image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {category_filter && (
          <Card.Text>
            <small className="text-muted">{category_filter} Photography</small>
          </Card.Text>
        )}
        {content && <Card.Text>{content}</Card.Text>}

        <div className={styles.AlbumBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own album!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() =>{}}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
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
