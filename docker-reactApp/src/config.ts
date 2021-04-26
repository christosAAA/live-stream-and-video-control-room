export const api_base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' :'/api'
export const socket_base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' :'/'