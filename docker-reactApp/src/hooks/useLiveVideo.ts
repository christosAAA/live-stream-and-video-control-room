import React, { useState, useEffect, useContext } from "react";
import { LiveVideoContext } from "../contexts/LiveVideoCreateContext";

export function useLiveVideo() {
  const liveVideoData = useContext(LiveVideoContext);

  const liveVideo = () => {
    const liveVideoName = Object.keys(liveVideoData)[0];
    const liveVideoUrl = Object.values(liveVideoData)[0];
    return {
      name: liveVideoName,
      url: liveVideoUrl
    };
  };

  return { liveVideo };
}
