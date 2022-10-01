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
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import Photo from "../photos/Photo";

function AlbumCommentsPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState({ results: [] });
  const [owner, setOwner] = useState();

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [photos, setPhotos] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: album }, { data: photos }, { data: comments }] =
          await Promise.all([
            axiosReq.get(`/albums/${id}`),
            axiosReq.get(`/photos/?album=${id}`),
            axiosReq.get(`/comments/?album=${id}`),
          ]);
        setOwner(album.owner);
        setAlbum({ results: [album] });
        setPhotos(photos);
        setComments(comments);

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
        {/* Show popular profiles */}
        <PopularProfiles mobile />

        <Container>
          <Album {...album.results[0]} setAlbums={setAlbum} albumPage />
        </Container>

        {/* Form to add comments */}
        <Container className={`${appStyles.Content}  mt-4 mb-4`}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              album={id}
              setAlbum={setAlbum}
              setComments={setComments}
            />
          ) : (
            "Sign in to leave comments"
          )}
        </Container>

        {/* List comments */}
        <div>Comments:</div>
        <Container className={appStyles.Content}>
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setAlbum={setAlbum}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>

      {/* Side Bar Components */}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Show popular profiles */}
        <PopularProfiles />
        {/* Form to add photo - only logged in owner */}
        {currentUser && is_owner ? (
          <>
            <Container className={`${appStyles.ContentPadOnly} mt-2 mb-2`}>
              <div>Add photos:</div>
              <PhotoCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                album={id}
                setAlbum={setAlbum}
              />
            </Container>
          </>
        ) : null}
        {/* List photos - Logged in user only */}
        {currentUser && is_owner ? (
          <div className="mb-2">Album photos:</div>
        ) : (
          <div className="mt-3 mb-2">Album photos:</div>
        )}
        <Container className={appStyles.Content}>
          {currentUser && photos.results.length ? (
            <InfiniteScroll
              children={photos.results.map((photo) => (
                <Photo
                  key={photo.id}
                  {...photo}
                  setAlbum={setAlbum}
                  setPhotos={setPhotos}
                />
              ))}
              dataLength={photos.results.length}
              loader={<Asset spinner />}
              hasMore={!!photos.next}
              next={() => fetchMoreData(photos, setPhotos)}
            />
          ) : currentUser && is_owner ? (
            <span>No photos yet, add your photos to album!</span>
          ) : currentUser ? (
            <span>No photos yet, come back later!</span>
          ) : (
            <span>Sign in to see photos</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default AlbumCommentsPage;
