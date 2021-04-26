import express from "express";
import upload from "express-fileupload";
import path from "path";
import userAuth from "./userAuth.js";
import { readFile, createFullVideoObj } from "./utils.js";
import {
  loginValidation,
  changeUserDetails,
  addUser,
  deleteUser,
  deleteVideo,
  uploadVideoFile,
  addLiveStreamLink,
  saveLiveVideo
} from "./routesCallbacks.js";
import SocketIOClient from "socket.io";
import { port } from "../config.js";

const app = express();
const server = require("http").Server(app);

const io: SocketIOClient.Server = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  }
});
require("./socketIO")(io);
app.use(upload());
app.use(express.urlencoded());
app.use(express.json());
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("user");
  next();
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static('app/dist/src/uploads/'));

////////////////////////////////////////////////////////////////////

// On client Login submit event is check the user name and password
// responds to the client with a valid message for each case
app.post("/login", loginValidation);

// app.get("/api", async ()=> await readFile("../dist/api/userDetails.json")) /////////

// On change user details submit event is check the user name and password
// responds to the client with a valid message for each case
app.post("/change_user_details", userAuth, changeUserDetails);

// On change user details submit event is check the user name and password
// responds to the client with a valid message for each case
// plain users has not access to add user functionality
app.post("/add_user", userAuth, addUser, async () => {
  io.emit("getUserListResponse", await readFile("/app/dist/src/api/userDetails.json"));
});

// On delete user submit event is check the user name and password
// responds to the client with a valid message for each case
// admin users cannot be deleted
// plain users has not access to add user functionality
app.post("/delete_user", userAuth, deleteUser, async () => {
  io.emit("getUserListResponse", await readFile("/app/dist/src/api/userDetails.json"));
});

// The current live video been saved to database
// for use doesn't depend on the admin app
app.post("/saveLiveVideo", userAuth, saveLiveVideo, async () => {
  io.emit("currentLiveVideoResponse", await readFile("/app/dist/src/api/currentLiveVideo.json"));
});

// Deletes video from server or removes stream link from stream file
app.post("/delete_video", userAuth, deleteVideo, async () => {
  io.emit("fullVideoList", await createFullVideoObj());
});

app.post("/upload_video_file", userAuth, uploadVideoFile, async () => {
  io.emit("fullVideoList", await createFullVideoObj());
});

app.post("/add_live_stream_link", userAuth, addLiveStreamLink, async () => {
  io.emit("fullVideoList", await createFullVideoObj());
});

server.listen(port, console.log(`running at ${port}`));
// server.listen(80, console.log("running at 80"));

//userDetails.json//
// {
//   "user1": {
//     "userStatus": "admin",
//     "userName": "christos",
//     "password": "$2b$10$Vqag0XtCSYRTkYitU566CO4gMpJmZGh7N03IVv/4CWPQpHPNoRfn."
//   },
//   "user2": {
//     "userStatus": "user",
//     "userName": "Tat",
//     "password": "$2b$10$kVLkVJm9CJG8DUK225EmLe4t4l30xjfN5.yn8wIDo6wGCP18MNwbu"
// }

//streamList.json//
// {
//   "streams": {
//     "default": { "main": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
//     "fromUser": {
//       "titleFromUser": "https://server/test.m3u8",
//       "titleFromUser2": "https://server/test2.m3u8",
//     }
//   }
// }

// currentLiveVideo.json//
// {"videoFileName":"http://localhost:5000/uploads/test.mp4"}

//createFullVideoObj()//
// {
//   streams: {
//     default: { "main": 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
//     fromUser: { "titleFromUser": "https://server/test.m3u8" }
//   },
//   videos: {
//     "videoFileName":"http://localhost:5000/uploads/test.mp4",
//     "videoFileName2":"http://localhost:5000/uploads/test2.mp4"
//   }
// }
