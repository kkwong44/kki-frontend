//
// Page shows Individual Album
//
import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Album from "./Album";
import PhotoCreateForm from "../photos/PhotoCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Photo from "../photos/Photo";

function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState({ results: [] });
  const [owner, setOwner] = useState();

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [photos, setPhotos] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: album }, { data: photos }] = await Promise.all([
          axiosReq.get(`/albums/${id}`),
          axiosReq.get(`/photos/?album=${id}`),
        ]);
        setOwner(album.owner);
        setAlbum({ results: [album] });
        setPhotos(photos);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  const is_owner = currentUser?.username === owner;

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>

        <Container className={appStyles.ContentGrey}>
          <Album {...album.results[0]} setAlbums={setAlbum} albumPage />
        </Container>

        <Container className={appStyles.ContentPadOnly}>
          {currentUser && is_owner ? (
            <PhotoCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              album={id}
              setAlbum={setAlbum}
              setPhotos={setPhotos}
            />
          ) : null}
        </Container>

        <Container className={appStyles.Content}>
          {currentUser && photos.results.length ? (
            photos.results.map((photo) => (
              <Photo
                key={photo.id}
                {...photo}
                setAlbum={setAlbum}
                setPhotos={setPhotos}
              />
            ))
          ) : currentUser && is_owner ? (
            <span>No photos yet, add your photos to album!</span>
          ) : (
            <span>Sign in to see photos</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Container>Popular profiles for desktop</Container>

        <Container>Comments</Container>
      </Col>
    </Row>
  );
}

export default AlbumPage;
