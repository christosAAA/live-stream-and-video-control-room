import React from "react";
import VideoList from "./VideoList/VideoList";
import { Container, Row, Col } from "react-bootstrap";
import UploadVideo from "./UploadVideo/UploadVideo";
import AddLiveStreamLink from "./AddLiveStreamLink/AddLiveStreamLink";
import VideoPlayerComp from "./VideoPlayerComp/VideoPlayerComp";
import classes from "./ControlRoom.module.css";

export default function ControlRoom() {
  return (
    <div className={classes.centerContainer}>
      <Row>
        <Col sm={5}>
          <h1 className={classes.videoLibaryTitle}>Video library</h1>
          <AddLiveStreamLink />
          <UploadVideo />
          <VideoList />
        </Col>
        <Col sm={7}>
          <VideoPlayerComp />
        </Col>
      </Row>
    </div>
  );
}
