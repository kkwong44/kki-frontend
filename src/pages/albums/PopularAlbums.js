//
// Popular albums component
// Configure for mobile and desktop devices
//
import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";

import Asset from "../../components/Asset";
import Albums from "./Albums";

const PopularAlbums = ({ mobile }) => {
  const [albumData, setAlbumData] = useState({
    popularAlbums: { results: [] },
  });

  const { popularAlbums } = albumData;
  const currentUser = useCurrentUser();

  // Get data from albums and order by likes count
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/albums/?ordering=-likes_count");
        setAlbumData((prevState) => ({
          ...prevState,
          popularAlbums: data,
        }));
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container
      // Check mobile or desktop
      // Show first 4 albums on mobile and 5 on desktop
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularAlbums.results.length ? (
        <>
          <p className="text-center mt-2">Most Liked Albums</p>
          <hr />
          {/* Mobile or desktop */}
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularAlbums.results.slice(0, 4).map((album) => (
                <Albums key={album.id} album={album} mobile />
              ))}
            </div>
          ) : (
            popularAlbums.results
              .slice(0, 5)
              .map((album) => <Albums key={album.id} album={album} />)
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularAlbums;
