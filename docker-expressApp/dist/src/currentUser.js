"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserId = exports.currentUser = void 0;
let currentUserId;
exports.currentUserId = currentUserId;
const currentUser = (userId) => {
    exports.currentUserId = currentUserId = userId;
    return userId;
};
exports.currentUser = currentUser;
