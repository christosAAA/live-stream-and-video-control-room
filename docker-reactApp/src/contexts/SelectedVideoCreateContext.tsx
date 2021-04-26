import { createContext } from "react";

export type SelectedVideoProps = { [x: string]: string };

export type SelectedVideoContextProps = {
  selectedVideo: SelectedVideoProps;
  setSelectedVideo: React.Dispatch<React.SetStateAction<SelectedVideoProps>>;
};

export const SelectedVideoContext = createContext<SelectedVideoContextProps>({
  selectedVideo: { [""]: "" },
  setSelectedVideo: () => [{ [""]: "" }]
});
