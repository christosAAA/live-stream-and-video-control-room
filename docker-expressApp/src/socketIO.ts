import SocketIOClient from 'socket.io'
import {
  readFile,
  readFolder,
  readStreamFile,
  createFullVideoObj,
} from './utils.js'
import fs from 'fs'
import { path, streamPath } from './config'

let liveVideoCurrentState: boolean
const setliveVideoCurrentState = () => {
  fs.access(streamPath + 'test.m3u8', (error) => {
    if (error) {
      liveVideoCurrentState = false
    } else {
      liveVideoCurrentState = true
    }
  })
}
setliveVideoCurrentState()
module.exports = function (io: SocketIOClient.Server) {
  var numClients = 0
  io.on('connection', async (socket: SocketIOClient.Socket) => {
    console.log('connection')
    io.emit('liveStreamState', liveVideoCurrentState)

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
    setInterval(() => {
      fs.access(streamPath + 'test.m3u8', (error) => {
        if (error) {
          if (liveVideoCurrentState !== false) {
            liveVideoCurrentState = false
            io.emit('liveStreamState', liveVideoCurrentState)
            console.log('live stream video file deleted')
          }
        } else {
          if (liveVideoCurrentState !== true) {
            liveVideoCurrentState = true
            io.emit('liveStreamState', liveVideoCurrentState)
            console.log('live stream video file created')
          }
        }
      })
    }, 10000)
  })
}
