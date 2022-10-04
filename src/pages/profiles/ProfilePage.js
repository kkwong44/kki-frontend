//
// Profile Page component
// Show profile data and list of albums
//
import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

import PopularProfiles from "./PopularProfiles";
import Album from "../albums/Album";
import PopularAlbums from "../albums/PopularAlbums";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profileAlbums, setProfileAlbums] = useState({ results: [] });

  // Fetch profiles and albums data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileAlbums }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/albums/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileAlbums(profileAlbums);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  // Header with profile data i.e counts and unfollow profile button
  const mainProfile = (
    <>
      {/* Dropdown menu for owner's profile */}
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt="Avatar"
          />
        </Col>
        <Col lg={6}>
          <h1 className="m-2 h3">{profile?.owner}</h1>
          <h2 className="h6">{profile?.name}</h2>
          <p>
            <a
              href={`mailto:${profile?.email}`}
              aria-label="Open email client in a new window."
            >
              {profile?.email}
            </a>
          </p>
          <Row className="justify-content-center no-gutters">
            <Col xs={4} className="my-2">
              <div>{profile?.albums_count}</div>
              <div>albums</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {/* Handle follow and unfollow profile ids */}
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
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
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  // List all albums associate with the selected profile
  const mainProfileAlbums = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s albums</p>
      <hr />
      {profileAlbums.results.length ? (
        <InfiniteScroll
          children={profileAlbums.results.map((album) => (
            <Album key={album.id} {...album} setAlbums={setProfileAlbums} />
          ))}
          dataLength={profileAlbums.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileAlbums.next}
          next={() => fetchMoreData(profileAlbums, setProfileAlbums)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} has no albums yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <PopularAlbums mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileAlbums}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        <br />
        <PopularAlbums />
      </Col>
    </Row>
  );
}

export default ProfilePage;
