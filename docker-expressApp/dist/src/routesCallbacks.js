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
exports.addLiveStreamLink = exports.uploadVideoFile = exports.deleteVideo = exports.saveLiveVideo = exports.deleteUser = exports.addUser = exports.changeUserDetails = exports.loginValidation = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const utils_js_1 = require("./utils.js");
const currentUser_js_1 = require("./currentUser.js");
const config_1 = require("./config");
const loginValidation = (loginFormData, response) => __awaiter(void 0, void 0, void 0, function* () {
    let userNameForm = '';
    let userPasswordForm = '';
    if (!loginFormData.body)
        return;
    userNameForm = loginFormData.body.userName;
    userPasswordForm = loginFormData.body.password;
    let validation = { message: '' };
    const userDetailsFromFile = yield utils_js_1.readFile(config_1.path + 'userDetails.json');
    // if user name exists returns password of specific user else returns false
    const checkUser = yield utils_js_1.userValidation(userNameForm, userDetailsFromFile);
    if (!checkUser) {
        validation = { message: 'wrong user name' };
        response.json(validation);
        return;
    }
    // from checkUser we are using the password from file
    const checkPassword = yield utils_js_1.passwordValidation(userPasswordForm, checkUser.password);
    if (checkPassword === true) {
        validation = { message: true }; // check why I cannot pass it????????????
        response.json({
            userStatus: checkUser.userStatus,
            message: true,
            userName: checkUser.userName,
            password: userPasswordForm,
        });
    }
    else {
        validation = { message: false };
        response.json(validation);
    }
});
exports.loginValidation = loginValidation;
const changeUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentUser_js_1.currentUserId) {
        console.log('please loggin again');
        return;
    }
    const userNameForm = req.body.newUserName;
    // create the new password
    const salt = yield bcrypt_1.default.genSalt(10);
    const newHashedPassword = yield bcrypt_1.default.hash(req.body.newPassword, salt);
    // get all data from Json file
    const usersDetailsFromFile = yield utils_js_1.readFile(config_1.path + 'userDetails.json');
    let usersDetails = JSON.stringify(usersDetailsFromFile);
    let usersDetailsObj = JSON.parse(usersDetails);
    const checkUser = yield utils_js_1.userValidation(userNameForm, usersDetailsObj);
    if (checkUser) {
        console.log('user already exists');
        res.json({ message: false });
        return;
    }
    // console.log("user STATUS", usersDetailsFromFile);
    //change data
    usersDetailsFromFile[`${currentUser_js_1.currentUserId}`] = {
        userStatus: usersDetailsFromFile[`${currentUser_js_1.currentUserId}`].userStatus,
        userName: req.body.newUserName,
        password: newHashedPassword,
    };
    let newUserDetails = JSON.stringify(usersDetailsFromFile);
    // console.log(newUserDetails);
    yield utils_js_1.saveFile(config_1.path + 'userDetails.json', newUserDetails);
    res.json({ message: true });
    next();
});
exports.changeUserDetails = changeUserDetails;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!currentUser_js_1.currentUserId) {
        console.log('please loggin again');
        return;
    }
    const userNameForm = req.body.newUserName;
    // create the new password
    const salt = yield bcrypt_1.default.genSalt(10);
    const newHashedPassword = yield bcrypt_1.default.hash(req.body.newPassword, salt);
    // get all data from Json file
    const usersDetailsFromFile = yield utils_js_1.readFile(config_1.path + 'userDetails.json');
    let usersDetails = JSON.stringify(usersDetailsFromFile);
    let usersDetailsObj = JSON.parse(usersDetails);
    // check if user exists
    const checkUser = yield utils_js_1.userValidation(userNameForm, usersDetailsObj);
    if (checkUser) {
        console.log('user already exists');
        res.json({ message: false });
        return;
    }
    const newUserId = Object.keys(usersDetailsObj).length + 1;
    //add data
    usersDetailsObj['user' + `${newUserId}`] = {
        userStatus: req.body.newUserStatus,
        userName: req.body.newUserName,
        password: newHashedPassword,
    };
    //save file
    let newUsersDetails = JSON.stringify(usersDetailsObj);
    yield utils_js_1.saveFile(config_1.path + 'userDetails.json', newUsersDetails);
    res.json({ message: true });
    next();
});
exports.addUser = addUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usersDetailsFromFile = yield utils_js_1.readFile(config_1.path + 'userDetails.json');
    if (usersDetailsFromFile[currentUser_js_1.currentUserId].userStatus === 'user') {
        console.log('Status:user you cannot delete users');
        return;
    }
    // console.log("from delet user", usersDetailsFromFile);
    let userLength = Object.keys(usersDetailsFromFile).length;
    if (userLength === 1) {
        console.log('return you are the last admin');
        return;
    }
    // console.log("delete user: ", req.body);
    let deleteUser = req.body.deleteUser;
    if (usersDetailsFromFile[deleteUser].userStatus === 'admin') {
        console.log('you cannot delete admins');
        return;
    }
    console.log(deleteUser);
    delete usersDetailsFromFile[`${deleteUser}`];
    // console.log("new List", usersDetailsFromFile);
    let objectLength = Object.keys(usersDetailsFromFile).length;
    let newListObj = {};
    for (let i = 0; i < objectLength; i++) {
        newListObj['user' + (i + 1)] = Object.values(usersDetailsFromFile)[i];
    }
    let newList = JSON.stringify(newListObj);
    // console.log(newListObj);
    yield utils_js_1.saveFile(config_1.path + 'userDetails.json', newList);
    res.send('user been deleted');
    next();
});
exports.deleteUser = deleteUser;
const saveLiveVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userInputCurrentVideo = req.body;
    let userInputCurrentVideoStr = JSON.stringify(userInputCurrentVideo);
    yield utils_js_1.saveFile(config_1.path + 'currentLiveVideo.json', userInputCurrentVideoStr);
    res.send('file been saved');
    next();
});
exports.saveLiveVideo = saveLiveVideo;
const deleteVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let currentVideoFromRequest = req.body.currentVideo;
    let currentVideoFromFile = yield utils_js_1.readFile(config_1.path + 'currentLiveVideo.json');
    currentVideoFromFile = Object.values(currentVideoFromFile)[0];
    if (currentVideoFromRequest === currentVideoFromFile) {
        console.log('file  is the same ');
        res.send('file  is the same');
        return;
    }
    // console.log(checkFileTypeM3u8(currentVideoFromRequest));
    if (utils_js_1.checkFileTypeM3u8(currentVideoFromRequest)) {
        // console.log("delete file from stream list file");
        const streamFile = yield utils_js_1.readFile(config_1.path + 'streamList.json');
        // console.log(streamFile.streams.fromUser);
        Object.keys(streamFile.streams.fromUser).forEach((item, key) => __awaiter(void 0, void 0, void 0, function* () {
            if (streamFile.streams.fromUser[item] === currentVideoFromRequest) {
                delete streamFile.streams.fromUser[item];
                const newStremListFile = JSON.stringify(streamFile);
                yield utils_js_1.saveFile(config_1.path + 'streamList.json', newStremListFile);
                // io.emit("fullVideoList", await createFullVideoObj());
                res.send('stream link been deleted');
                // console.log("new stream file", streamFile);
                next();
            }
        }));
    }
    if (currentVideoFromRequest !== currentVideoFromFile) {
        fs_1.default.watch(config_1.uploadPath + currentVideoFromRequest, (eventType, filename) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log('WATCH UPLOAD FOLDER', eventType, filename)
            res.send('video file been deleted');
            next();
        }));
        fs_1.default.unlinkSync(config_1.uploadPath + currentVideoFromRequest);
    }
});
exports.deleteVideo = deleteVideo;
const uploadVideoFile = (req, res, next) => {
    if (!req.files)
        return;
    const fileObject = Object.values(req.files)[0];
    if (fileObject) {
        let filename = fileObject.name;
        fileObject.mv(config_1.uploadPath + filename, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.send('error');
                }
                else {
                    res.send('File Uploaded');
                    next();
                }
            });
        });
    }
};
exports.uploadVideoFile = uploadVideoFile;
const addLiveStreamLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('form post new stream', req.body)
    const userStreamData = req.body;
    const streamFile = yield utils_js_1.readFile(config_1.path + 'streamList.json');
    // console.log('stream file ', streamFile.streams.fromUser)
    if (utils_js_1.inputStreamLinkValidation(streamFile, userStreamData)) {
        streamFile.streams.fromUser[`${Object.keys(req.body)[0]}`] = Object.values(req.body)[0];
        const newStremListFile = JSON.stringify(streamFile);
        yield utils_js_1.saveFile(config_1.path + 'streamList.json', newStremListFile);
        res.send('stream link been added');
        next();
    }
    else {
        res.send('stream link already exist');
        console.log('data already exist');
    }
});
exports.addLiveStreamLink = addLiveStreamLink;
