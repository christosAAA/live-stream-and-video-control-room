export const api_base = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' :'/api'
export const socket_base = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' :'/'
export const uploadPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/uploads/' :'/uploads/'
export const streamPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/stream/' :'/stream/'