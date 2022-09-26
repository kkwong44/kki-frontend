import React from "react";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Photo.module.css";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

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
    <div>
      <Card className={styles.Photo}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              {is_owner ? (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Red}`}
                  onClick={() => handleDelete()}
                  type="button"
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
            </div>
          </Media>
        </Card.Body>
        <hr />
        <Link to={`/albums/${id}`}>
          <Card.Img src={photo_image} alt={title} />
        </Link>
        <hr />
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
        </Card.Body>
      </Card>
      <br></br>
    </div>
  );
};

export default Photo;