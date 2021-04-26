import auth from "basic-auth";
import { readFile, userValidation, passwordValidation } from "./utils.js";
import { UserProps, ValidationProps, UserDetailsFromFileProps } from "./types.js";
import express from "express";
let userNameForm: string = "";
let userPasswordForm: string = "";

const userAuth: express.RequestHandler = async (req, res, next) => {
  const user = auth(req);

  if (!user) return;
  userNameForm = user.name;
  userPasswordForm = user.pass;

  let validation: ValidationProps = { message: "" };
  const userDetailsFromFile: UserDetailsFromFileProps = await readFile(
    "/app/dist/src/api/userDetails.json"
  );

  // if user name exists returns password of specific user else returns false
  const checkUser: UserProps = await userValidation(userNameForm, userDetailsFromFile);
  if (!checkUser) {
    validation = { message: "wrong user name" };
    console.log("wrong user name");
    res.json(validation);
  }
  // from checkUser we are using the password from file
  const checkPassword: Boolean = await passwordValidation(
    userPasswordForm,
    checkUser.password
  );

  if (checkPassword === true) {
    console.log("pass");
    next();
  }
};

export default userAuth;
