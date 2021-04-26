import SocketIOClient from 'socket.io'
import {
  readFile,
  readFolder,
  readStreamFile,
  createFullVideoObj,
} from './utils.js'

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
      io.emit(
        'getUserListResponse',
        await readFile('/app/dist/src/api/userDetails.json')
      )
    })

    socket.on('videoFilesListRequest', async () => {
      // console.log('videoFilesListRequest')
      io.emit('videoFilesListResponse', await readFolder())
      io.emit('streamList', await readStreamFile())
      io.emit('fullVideoList', await createFullVideoObj())
    })

    socket.on('currentLiveVideoRequest', async () => {
      const response = await readFile('/app/dist/src/api/currentLiveVideo.json')
      io.emit('currentLiveVideoResponse', response)
    })
  })
}
