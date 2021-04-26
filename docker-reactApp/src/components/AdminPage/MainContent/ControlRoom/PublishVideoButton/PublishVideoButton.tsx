import React, { useContext } from "react";
import classes from "./PublishVideoButton.module.css";
import { useAxiosRequest } from "../../../../../hooks/useAxiosRequest";
import {
  SelectedVideoContext,
  SelectedVideoProps
} from "../../../../../contexts/SelectedVideoCreateContext";

export default function PublishVideo() {
  const { request } = useAxiosRequest();
  const { selectedVideo } = useContext(SelectedVideoContext);
  const selectedVideoName = Object.keys(selectedVideo)[0];

  const publishVideo = async (
    selectedVideoName: string,
    selectedVideo: SelectedVideoProps
  ) => {
    if (!window.confirm(`Are you sure you wanna publish ${selectedVideoName}?`)) return;
    request("post", "/saveLiveVideo", selectedVideo);
  };

  return (
    <button
      className={classes.publishButton}
      onClick={() => publishVideo(selectedVideoName, selectedVideo)}
    >
      <i className={classes.publishIcon}></i>
      Publish video
    </button>
  );
}
