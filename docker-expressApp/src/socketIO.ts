import SocketIOClient from 'socket.io'
import {
  readFile,
  readFolder,
  readStreamFile,
  createFullVideoObj,
} from './utils.js'
import { path, streamPath } from './config'
import fs from 'fs'

module.exports = function (io: SocketIOClient.Server) {
  var numClients = 0
  io.on('connection', async (socket: SocketIOClient.Socket) => {
    console.log('connection')
    socket.on('connectedUsers', async (data: string) => {
      io.emit('connectedUsersResponse', numClients)
      if (data != 'admin') {
        numClients++
        io.emit('connectedUsersResponse', numClients)
        console.log('Connected clients:', numClients)

        socket.on('disconnect', function () {
          numClients--
          io.emit('connectedUsersResponse', numClients)
          console.log('Connected clients:', numClients)
        })
      }
    })

    socket.on('getUserListRequest', async () => {
      // console.log(await readFile('/app/dist/src/api/userDetails.json'))
      io.emit('getUserListResponse', await readFile(path + 'userDetails.json'))
    })

    socket.on('videoFilesListRequest', async () => {
      // console.log('videoFilesListRequest')
      io.emit('videoFilesListResponse', await readFolder())
      io.emit('streamList', await readStreamFile())
      io.emit('fullVideoList', await createFullVideoObj())
    })

    socket.on('currentLiveVideoRequest', async () => {
      const response = await readFile(path + 'currentLiveVideo.json')
      io.emit('currentLiveVideoResponse', response)
    })

    //check if live stream file exists
    let state = false
    let prevState = false
    setInterval(() => {
      fs.access(streamPath + 'test.m3u8', (error) => {
        if (error) {
          state = false
          console.log('live stream file been deleted')
          if (state !== prevState) {
            io.emit('liveStreamState', false)
            prevState = false
          }

          return
        }
        state = true
        console.log('live stream file been created')
        if (state !== prevState) {
          io.emit('liveStreamState', true)
          prevState = true
        }
      })
    }, 3000)
  })
}
