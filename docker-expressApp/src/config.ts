export const port = process.env["NODE_ENV"] === "development" ? 5000 : 80;
export const path = process.env["NODE_ENV"] === "development" ? 'dist/src/api/' : '/app/dist/src/api/';
export const uploadPath = process.env["NODE_ENV"] === "development" ? 'dist/src/uploads/' : '/app/dist/src/uploads/';
export const streamPath = process.env["NODE_ENV"] === "development" ? 'dist/src/stream/' : '/app/dist/src/stream/';

