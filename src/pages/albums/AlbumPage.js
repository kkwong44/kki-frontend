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


function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{data: album}] = await Promise.all([
                axiosReq.get(`/albums/${id}`)
            ])
            setAlbum({results: [album]})
            // console.log(album)
        } catch(err) {
            console.log(err)
        }
    }
    handleMount();
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Album {...album.results[0]} setAlbums={setAlbum} albumPage />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default AlbumPage;
