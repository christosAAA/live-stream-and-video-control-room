import { createContext } from "react";

export type VideosInfoFromFileProps = {streams:{default:{main: string},fromUser:{}},videos:{[x:string]: string}}

export const VideosListDataContext = createContext<VideosInfoFromFileProps>({streams:{default:{main: ""},fromUser:{}},videos:{[""]: ""}});

// [
//   {
//     main: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
//     fromUserdata: {
//       chris1:
//         "https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8",
//       tatev: "tatev's live stream",
//       newStream: "https://server/test.m3u8"
//     }
//   },
//   [
//     "aejaa_Medea_trailer.mp4",
//     "aejaa_reconnect_keren.mov",
//     "aejaa_stream_promo.mp4",
//     "out.mp4"
//   ]
// ];
