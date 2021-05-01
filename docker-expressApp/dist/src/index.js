"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const fs_1 = __importDefault(require("fs"));
const userAuth_js_1 = __importDefault(require("./userAuth.js"));
const utils_js_1 = require("./utils.js");
const routesCallbacks_js_1 = require("./routesCallbacks.js");
const config_js_1 = require("./config.js");
const app = express_1.default();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
});
require("./socketIO")(io);
app.use(express_fileupload_1.default());
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("user");
    next();
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express_1.default.static(config_js_1.uploadPath));
////////////////////////////////////////////////////////////////////
// On client Login submit event is check the user name and password
// responds to the client with a valid message for each case
app.post("/login", routesCallbacks_js_1.loginValidation);
// app.get("/api", async ()=> await readFile("../dist/api/userDetails.json")) /////////
// On change user details submit event is check the user name and password
// responds to the client with a valid message for each case
app.post("/change_user_details", userAuth_js_1.default, routesCallbacks_js_1.changeUserDetails);
// On change user details submit event is check the user name and password
// responds to the client with a valid message for each case
// plain users has not access to add user functionality
app.post("/add_user", userAuth_js_1.default, routesCallbacks_js_1.addUser, () => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("getUserListResponse", yield utils_js_1.readFile(config_js_1.path + "userDetails.json"));
}));
// On delete user submit event is check the user name and password
// responds to the client with a valid message for each case
// admin users cannot be deleted
// plain users has not access to add user functionality
app.post("/delete_user", userAuth_js_1.default, routesCallbacks_js_1.deleteUser, () => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("getUserListResponse", yield utils_js_1.readFile(config_js_1.path + "userDetails.json"));
}));
// The current live video been saved to database
// for use doesn't depend on the admin app
app.post("/saveLiveVideo", userAuth_js_1.default, routesCallbacks_js_1.saveLiveVideo, () => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("currentLiveVideoResponse", yield utils_js_1.readFile(config_js_1.path + "currentLiveVideo.json"));
}));
// Deletes video from server or removes stream link from stream file
app.post("/delete_video", userAuth_js_1.default, routesCallbacks_js_1.deleteVideo, () => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("fullVideoList", yield utils_js_1.createFullVideoObj());
}));
//
app.post("/upload_video_file", userAuth_js_1.default, routesCallbacks_js_1.uploadVideoFile, () => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("fullVideoList", yield utils_js_1.createFullVideoObj());
}));
//
app.post("/add_live_stream_link", userAuth_js_1.default, routesCallbacks_js_1.addLiveStreamLink, () => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("fullVideoList", yield utils_js_1.createFullVideoObj());
}));
// watch mounted stream folder for the live stream file 
const watchStreamFolder = () => {
    fs_1.default.watchFile(__dirname + "/stream/test.m3u8", (eventType) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("WATCH STREAM FOLDER", eventType.dev);
        let liveStream = false;
        if (eventType.dev !== 0) {
            liveStream = true;
        }
        io.emit("liveStreamState", liveStream);
    }));
};
watchStreamFolder();
server.listen(config_js_1.port, console.log(`running at ${config_js_1.port}`));
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
