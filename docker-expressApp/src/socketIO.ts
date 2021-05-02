import SocketIOClient from 'socket.io'
import {
  readFile,
  readFolder,
  readStreamFile,
  createFullVideoObj,
  // watchStreamFolder
} from './utils.js'
import { path, streamPath } from './config'
import fs, { exists } from 'fs'

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

    socket.on('liveStreamStateRequest', async () => {
      let liveStream = false
      fs.access(streamPath + 'test.m3u8', (error) => {
        if (error) {
          console.log(error)
          io.emit('liveStreamState', liveStream)
        }
      })
      console.log('exists')
      fs.watchFile(streamPath + 'test.m3u8', async (eventType) => {
        console.log("WATCH STREAM FOLDER", eventType.dev);

        if (eventType.dev !== 0) {
          liveStream = true
          io.emit('liveStreamState', liveStream)
        }
        if (eventType.dev === 0) {
          liveStream = false
          io.emit('liveStreamState', liveStream)
        }

      })
    })
  })
}
