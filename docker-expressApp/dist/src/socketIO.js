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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("./utils.js");
const config_1 = require("./config");
module.exports = function (io) {
    var numClients = 0;
    io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
        console.log('connection');
        socket.on('connectedUsers', (data) => __awaiter(this, void 0, void 0, function* () {
            io.emit('connectedUsersResponse', numClients);
            if (data != 'admin') {
                numClients++;
                io.emit('connectedUsersResponse', numClients);
                console.log('Connected clients:', numClients);
                socket.on('disconnect', function () {
                    numClients--;
                    io.emit('connectedUsersResponse', numClients);
                    console.log('Connected clients:', numClients);
                });
            }
        }));
        socket.on('getUserListRequest', () => __awaiter(this, void 0, void 0, function* () {
            // console.log(await readFile('/app/dist/src/api/userDetails.json'))
            io.emit('getUserListResponse', yield utils_js_1.readFile(config_1.path + 'userDetails.json'));
        }));
        socket.on('videoFilesListRequest', () => __awaiter(this, void 0, void 0, function* () {
            // console.log('videoFilesListRequest')
            io.emit('videoFilesListResponse', yield utils_js_1.readFolder());
            io.emit('streamList', yield utils_js_1.readStreamFile());
            io.emit('fullVideoList', yield utils_js_1.createFullVideoObj());
        }));
        socket.on('currentLiveVideoRequest', () => __awaiter(this, void 0, void 0, function* () {
            const response = yield utils_js_1.readFile(config_1.path + 'currentLiveVideo.json');
            io.emit('currentLiveVideoResponse', response);
        }));
    }));
};
