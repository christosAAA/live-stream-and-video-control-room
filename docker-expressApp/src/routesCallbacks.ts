import bcrypt from 'bcrypt'
import fs from 'fs'
import { UserProps, ValidationProps, UserDetailsFromFileProps } from './types'
import {
  readFile,
  userValidation,
  passwordValidation,
  saveFile,
  inputStreamLinkValidation,
  checkFileTypeM3u8,
} from './utils.js'
import { currentUserId } from './currentUser.js'
import express from 'express'
import upload from 'express-fileupload'
import { path, uploadPath } from './config'
export const loginValidation = async (
  loginFormData: express.Request,
  response: express.Response
) => {
  let userNameForm: string = ''
  let userPasswordForm: string = ''
  if (!loginFormData.body) return
  userNameForm = loginFormData.body.userName
  userPasswordForm = loginFormData.body.password

  let validation: ValidationProps = { message: '' }
  const userDetailsFromFile: UserDetailsFromFileProps = await readFile(
    path + 'userDetails.json'
  )

  // if user name exists returns password of specific user else returns false
  const checkUser: UserProps = await userValidation(
    userNameForm,
    userDetailsFromFile
  )
  if (!checkUser) {
    validation = { message: 'wrong user name' }
    response.json(validation)
    return
  }
  // from checkUser we are using the password from file
  const checkPassword: Boolean = await passwordValidation(
    userPasswordForm,
    checkUser.password
  )

  if (checkPassword === true) {
    validation = { message: true } // check why I cannot pass it????????????
    response.json({
      userStatus: checkUser.userStatus,
      message: true,
      userName: checkUser.userName,
      password: userPasswordForm,
    })
  } else {
    validation = { message: false }
    response.json(validation)
  }
}

export const changeUserDetails: express.RequestHandler = async (
  req,
  res,
  next
) => {
  if (!currentUserId) {
    console.log('please loggin again')
    return
  }
  const userNameForm = req.body.newUserName
  // create the new password
  const salt = await bcrypt.genSalt(10)
  const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt)

  // get all data from Json file
  const usersDetailsFromFile: UserDetailsFromFileProps = await readFile(
    path + 'userDetails.json'
  )
  let usersDetails = JSON.stringify(usersDetailsFromFile)
  let usersDetailsObj = JSON.parse(usersDetails)

  const checkUser: UserProps = await userValidation(
    userNameForm,
    usersDetailsObj
  )

  if (checkUser) {
    console.log('user already exists')
    res.json({ message: false })
    return
  }

  // console.log("user STATUS", usersDetailsFromFile);
  //change data
  usersDetailsFromFile[`${currentUserId}`] = {
    userStatus: usersDetailsFromFile[`${currentUserId}`].userStatus,
    userName: req.body.newUserName,
    password: newHashedPassword,
  }
  let newUserDetails = JSON.stringify(usersDetailsFromFile)
  // console.log(newUserDetails);
  await saveFile(path + 'userDetails.json', newUserDetails)
  res.json({ message: true })
  next()
}

export const addUser: express.RequestHandler = async (req, res, next) => {
  if (!currentUserId) {
    console.log('please loggin again')
    return
  }
  const userNameForm = req.body.newUserName
  // create the new password
  const salt = await bcrypt.genSalt(10)
  const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt)

  // get all data from Json file
  const usersDetailsFromFile: UserDetailsFromFileProps = await readFile(
    path + 'userDetails.json'
  )
  let usersDetails = JSON.stringify(usersDetailsFromFile)
  let usersDetailsObj = JSON.parse(usersDetails)
  // check if user exists

  const checkUser: UserProps = await userValidation(
    userNameForm,
    usersDetailsObj
  )

  if (checkUser) {
    console.log('user already exists')
    res.json({ message: false })
    return
  }
  const newUserId = Object.keys(usersDetailsObj).length + 1
  //add data
  usersDetailsObj['user' + `${newUserId}`] = {
    userStatus: req.body.newUserStatus,
    userName: req.body.newUserName,
    password: newHashedPassword,
  }
  //save file
  let newUsersDetails = JSON.stringify(usersDetailsObj)
  await saveFile(path + 'userDetails.json', newUsersDetails)
  res.json({ message: true })
  next()
}

export const deleteUser: express.RequestHandler = async (req, res, next) => {
  const usersDetailsFromFile: UserDetailsFromFileProps = await readFile(
    path + 'userDetails.json'
  )

  if (usersDetailsFromFile[currentUserId].userStatus === 'user') {
    console.log('Status:user you cannot delete users')
    return
  }
  // console.log("from delet user", usersDetailsFromFile);
  let userLength = Object.keys(usersDetailsFromFile).length
  if (userLength === 1) {
    console.log('return you are the last admin')
    return
  }
  // console.log("delete user: ", req.body);
  let deleteUser = req.body.deleteUser
  if (usersDetailsFromFile[deleteUser].userStatus === 'admin') {
    console.log('you cannot delete admins')
    return
  }
  console.log(deleteUser)
  delete usersDetailsFromFile[`${deleteUser}`]
  // console.log("new List", usersDetailsFromFile);
  let objectLength = Object.keys(usersDetailsFromFile).length

  let newListObj: UserDetailsFromFileProps = {}
  for (let i = 0; i < objectLength; i++) {
    newListObj['user' + (i + 1)] = Object.values(usersDetailsFromFile)[i]
  }
  let newList = JSON.stringify(newListObj)

  // console.log(newListObj);

  await saveFile(path + 'userDetails.json', newList)
  res.send('user been deleted')
  next()
}

export const saveLiveVideo: express.RequestHandler = async (req, res, next) => {
  let userInputCurrentVideo = req.body
  let userInputCurrentVideoStr = JSON.stringify(userInputCurrentVideo)
  await saveFile(path + 'currentLiveVideo.json', userInputCurrentVideoStr)
  res.send('file been saved')
  next()
}

export const deleteVideo: express.RequestHandler = async (req, res, next) => {
  let currentVideoFromRequest = req.body.currentVideo
  let currentVideoFromFile = await readFile(path + 'currentLiveVideo.json')
  currentVideoFromFile = Object.values(currentVideoFromFile)[0]

  if (currentVideoFromRequest === currentVideoFromFile) {
    console.log('file  is the same ')
    res.send('file  is the same')
    return
  }
  // console.log(checkFileTypeM3u8(currentVideoFromRequest));

  if (checkFileTypeM3u8(currentVideoFromRequest)) {
    // console.log("delete file from stream list file");

    const streamFile = await readFile(path + 'streamList.json')
    // console.log(streamFile.streams.fromUser);
    Object.keys(streamFile.streams.fromUser).forEach(async (item, key) => {
      if (streamFile.streams.fromUser[item] === currentVideoFromRequest) {
        delete streamFile.streams.fromUser[item]
        const newStremListFile = JSON.stringify(streamFile)
        await saveFile(path + 'streamList.json', newStremListFile)
        // io.emit("fullVideoList", await createFullVideoObj());
        res.send('stream link been deleted')
        // console.log("new stream file", streamFile);
        next()
      }
    })
  }
  if (currentVideoFromRequest !== currentVideoFromFile) {
    fs.watch(
      uploadPath + currentVideoFromRequest,
      async (eventType, filename) => {
        // console.log('WATCH UPLOAD FOLDER', eventType, filename)
        res.send('video file been deleted')
        next()
      }
    )
    fs.unlinkSync(uploadPath + currentVideoFromRequest)
  }
}

export const uploadVideoFile = (
  req: upload.FileArray,
  res: upload.Options,
  next: any
) => {
  if (!req.files) return
  const fileObject = Object.values(req.files)[0]

  if (fileObject) {
    let filename = fileObject.name

    fileObject.mv(uploadPath + filename, async function (err: Error) {
      if (err) {
        res.send('error')
      } else {
        res.send('File Uploaded')
        next()
      }
    })
  }
}

export const addLiveStreamLink: express.RequestHandler = async (
  req,
  res,
  next
) => {
  // console.log('form post new stream', req.body)
  const userStreamData = req.body
  const streamFile = await readFile(path + 'streamList.json')
  // console.log('stream file ', streamFile.streams.fromUser)
  if (inputStreamLinkValidation(streamFile, userStreamData)) {
    streamFile.streams.fromUser[`${Object.keys(req.body)[0]}`] = Object.values(
      req.body
    )[0]
    const newStremListFile = JSON.stringify(streamFile)
    await saveFile(path + 'streamList.json', newStremListFile)
    res.send('stream link been added')
    next()
  } else {
    res.send('stream link already exist')
    console.log('data already exist')
  }
}
