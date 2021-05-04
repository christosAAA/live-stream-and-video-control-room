import fs from 'fs'
import bcrypt from 'bcrypt'
import { currentUser } from './currentUser.js'
import {
  UserDetailsFromFileProps,
  StreamsProps,
  UserStreamDataProps,
} from './types.js'
import { uploadPath, path } from './config'
// Reads data from file and parse them to an object
// return the object
export const readFile = async (file: string) => {
  let parsedData = (resolve: Function) => {
    fs.readFile(file, 'utf8', async (err, data: string) => {
      if (err) throw err
      let dataFromFile: Object = JSON.parse(data)
      resolve(dataFromFile)
    })
  }
  return new Promise<any>(parsedData)
}

// Check if the user name input exists in the
// user details file
// returns the user object or false
export const userValidation: Function = async (
  nameFromForm: string,
  userDetailsFromFile: UserDetailsFromFileProps
) => {
  let ifUserExists = (resolve: Function) => {
    let validation = false
    Object.keys(userDetailsFromFile).forEach(async (key: string) => {
      if (userDetailsFromFile[key].userName == nameFromForm) {
        validation = true
        currentUser(key) // Set current user for later use on the entire app
        resolve(userDetailsFromFile[key])
      }
    })
    if (validation === false) {
      resolve(false)
    }
  }
  return new Promise(ifUserExists)
}

// If the user exist checks the password
// returns true or false
export const passwordValidation: Function = async (
  passwordFromForm: string,
  passwordFromFile: string
) => {
  let passwordComparison = (resolve: Function) => {
    bcrypt.hash(passwordFromForm, 10, (err, hash: string) => {
      bcrypt.compare(
        passwordFromForm,
        passwordFromFile,
        function (err, result: boolean) {
          if (result === true) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      )
    })
  }
  return new Promise(passwordComparison)
}

//
export const saveFile = async (file: string, data: any) => {
  fs.writeFile(file, data, 'utf8', (err) => {
    if (err) return console.log('error')
    console.log('saved')
    return
  })
}

// Reads the folder with the video files
// returns object with filename and filelink
export const readFolder = async () => {
  let videos = {}
  let files = await fs.promises.readdir(uploadPath)
  files.forEach((file: string, key: number) => {
    const fileName = file.split('.')[0]
    videos = { ...videos, [fileName]: file }
  })
  return videos
}

export const readStreamFile = async () => {
  let fileLinks: StreamsProps
  const response = await readFile(path + 'streamList.json')
  fileLinks = response.streams
  return fileLinks
}

export const createFullVideoObj = async () => {
  const videoFiles = await readFolder()
  const streamLinks = await readStreamFile()
  const fullList = { streams: streamLinks, videos: videoFiles }
  return fullList
}

// Validates stream name and link user input
export const inputStreamLinkValidation = (
  streamFile: StreamsProps,
  userStreamData: UserStreamDataProps
) => {
  let result = true
  Object.keys(streamFile.streams.fromUser).forEach((item, key) => {
    if (item === Object.keys(userStreamData)[0]) {
      console.log('name already exists')
      result = false
    }
  })
  Object.values(streamFile.streams.fromUser).forEach((item, key) => {
    // console.log('stream from user', item, Object.values(userStreamData)[0])
    if (item === Object.values(userStreamData)[0]) {
      console.log('link already exists')
      result = false
    }
  })
  return result
}

// Check if the input element for delete is a link or file
// returns true or false
export const checkFileTypeM3u8 = (videoInputLink: string) => {
  const videoTypeM3u8 = videoInputLink.endsWith('.m3u8')
  if (videoTypeM3u8) {
    console.log('delete stream')
    return true
  } else {
    console.log('delete video')
    return false
  }
}
