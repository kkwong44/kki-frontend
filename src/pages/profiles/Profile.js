//
// Profile component for individual profile
//
import React from "react";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

import Button from "react-bootstrap/Button";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profile, mobile, imageSize = 40 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const {handleFollow, handleUnfollow} = useSetProfileData();

  return (
    // Show profile avatar and name
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      {/* Check mobile or desktop */}
      {/* Only show follow button on unfollow profiles exclude current user */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
