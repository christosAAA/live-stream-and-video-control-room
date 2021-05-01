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
exports.checkFileTypeM3u8 = exports.inputStreamLinkValidation = exports.createFullVideoObj = exports.readStreamFile = exports.readFolder = exports.saveFile = exports.passwordValidation = exports.userValidation = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const currentUser_js_1 = require("./currentUser.js");
const config_1 = require("./config");
// Reads data from file and parse them to an object
// return the object
const readFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedData = (resolve) => {
        fs_1.default.readFile(file, 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            let dataFromFile = JSON.parse(data);
            resolve(dataFromFile);
        }));
    };
    return new Promise(parsedData);
});
exports.readFile = readFile;
// Check if the user name input exists in the
// user details file
// returns the user object or false
const userValidation = (nameFromForm, userDetailsFromFile) => __awaiter(void 0, void 0, void 0, function* () {
    let ifUserExists = (resolve) => {
        let validation = false;
        Object.keys(userDetailsFromFile).forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
            if (userDetailsFromFile[key].userName == nameFromForm) {
                validation = true;
                currentUser_js_1.currentUser(key); // Set current user for later use on the entire app
                resolve(userDetailsFromFile[key]);
            }
        }));
        if (validation === false) {
            resolve(false);
        }
    };
    return new Promise(ifUserExists);
});
exports.userValidation = userValidation;
// If the user exist checks the password
// returns true or false
const passwordValidation = (passwordFromForm, passwordFromFile) => __awaiter(void 0, void 0, void 0, function* () {
    let passwordComparison = (resolve) => {
        bcrypt_1.default.hash(passwordFromForm, 10, (err, hash) => {
            bcrypt_1.default.compare(passwordFromForm, passwordFromFile, function (err, result) {
                if (result === true) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    return new Promise(passwordComparison);
});
exports.passwordValidation = passwordValidation;
//
const saveFile = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.writeFile(file, data, 'utf8', (err) => {
        if (err)
            return console.log('error');
        console.log('saved');
        return;
    });
});
exports.saveFile = saveFile;
// Reads the folder with the video files
// returns object with filename and filelink
const readFolder = () => __awaiter(void 0, void 0, void 0, function* () {
    let videos = {};
    let files = yield fs_1.default.promises.readdir(config_1.uploadPath);
    files.forEach((file, key) => {
        const fileName = file.split('.')[0];
        videos = Object.assign(Object.assign({}, videos), { [fileName]: file });
    });
    return videos;
});
exports.readFolder = readFolder;
const readStreamFile = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileLinks;
    const response = yield exports.readFile(config_1.path + 'streamList.json');
    fileLinks = response.streams;
    return fileLinks;
});
exports.readStreamFile = readStreamFile;
const createFullVideoObj = () => __awaiter(void 0, void 0, void 0, function* () {
    const videoFiles = yield exports.readFolder();
    const streamLinks = yield exports.readStreamFile();
    const fullList = { streams: streamLinks, videos: videoFiles };
    return fullList;
});
exports.createFullVideoObj = createFullVideoObj;
// Validates stream name and link user input
const inputStreamLinkValidation = (streamFile, userStreamData) => {
    let result = true;
    Object.keys(streamFile.streams.fromUser).forEach((item, key) => {
        if (item === Object.keys(userStreamData)[0]) {
            console.log('name already exists');
            result = false;
        }
    });
    Object.values(streamFile.streams.fromUser).forEach((item, key) => {
        // console.log('stream from user', item, Object.values(userStreamData)[0])
        if (item === Object.values(userStreamData)[0]) {
            console.log('link already exists');
            result = false;
        }
    });
    return result;
};
exports.inputStreamLinkValidation = inputStreamLinkValidation;
// Check if the input element for delete is a link or file
// returns true or false
const checkFileTypeM3u8 = (videoInputLink) => {
    const videoTypeM3u8 = videoInputLink.endsWith('.m3u8');
    if (videoTypeM3u8) {
        console.log('delete stream');
        return true;
    }
    else {
        console.log('delete video');
        return false;
    }
};
exports.checkFileTypeM3u8 = checkFileTypeM3u8;
