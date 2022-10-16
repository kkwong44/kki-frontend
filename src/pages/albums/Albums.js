//
// Display Popular Albums in mobile or desktop modes
//
import React from "react";

import { Link } from "react-router-dom";

import styles from "../../styles/Albums.module.css"

const Albums = (props) => {
  const { album, mobile, imageSize = 40 } = props;
  const { id, cover_image, title } = album;

  // Set popular albums data based on mobile or desktop devices
  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        {/* Show album cover image and link to album */}
        <Link className="align-self-center" to={`/albums/${id}`}>
          <img
            src={cover_image}
            height={imageSize}
            width={imageSize}
            alt="Album Cover"
          />
        </Link>
      </div>
      {/* Show album id in mobile and title in desktop */}
      {mobile ? (
        <div className={`mx-2 ${styles.WordBreak}`}>
          <strong>album #{id}</strong>
        </div>
      ) : (
        <div className="mx-2 text-truncate">
          <strong>{title}</strong>
        </div>
      )}
    </div>
  );
};

export default Albums;
