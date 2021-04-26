import React, { useState } from "react";
import {
  SelectedVideoContext,
  SelectedVideoProps
} from "../../contexts/SelectedVideoCreateContext";
import { VideoListProvider } from "../../contexts/VideoListProvider";
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
import MainContent from "./MainContent/MainContent";


export default function AdminPage() {
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoProps>({
    ["main"]: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  });

  return (
    <>
      <VideoListProvider>
        <SelectedVideoContext.Provider value={{ selectedVideo, setSelectedVideo }}>
          <NavBar />
          <Header />
          <MainContent />
        </SelectedVideoContext.Provider>
      </VideoListProvider>
    </>
  );
}
