// 
// Page to shows list of albums
// List can be filter be search, likes and profile
// 
import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";
import styles from "../../styles/AlbumListPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Album from "./Album";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function AlbumListPage({ message, filter = "" }) {
  const [albums, setAlbums] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetch albums. Apply filter and search when needed
    const fetchAlbums = async () => {
      try {
        const { data } = await axiosReq.get(`/albums/?${filter}search=${query}`);
        setAlbums(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchAlbums();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          // Search bar and apply search
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="Text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {/* Load list of albums and apply infinite scroll */}
            {albums.results.length ? (
              <InfiniteScroll
                children={albums.results.map((album) => (
                  <Album key={album.id} {...album} setAlbums={setAlbums} />
                ))}
                dataLength={albums.results.length}
                loader={<Asset spinner />}
                hasMore={!!albums.next}
                next={() => fetchMoreData(albums, setAlbums)}
              />
            ) : (
              // Display no results when albums returned is zero
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          // Load spinner image while loading the albums
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default AlbumListPage;
