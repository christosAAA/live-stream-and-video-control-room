"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPath = exports.path = exports.port = void 0;
exports.port = process.env["NODE_ENV"] === "development" ? 5000 : 80;
exports.path = process.env["NODE_ENV"] === "development" ? 'dist/src/api/' : '/app/dist/src/api/';
exports.uploadPath = process.env["NODE_ENV"] === "development" ? 'dist/src/uploads/' : '/app/dist/src/uploads/';
