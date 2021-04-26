import React, { useState } from "react";
import { Form, Button, Alert, FormControlProps } from "react-bootstrap";
import { useAxiosRequest } from "../../../../../hooks/useAxiosRequest";
import classes from "./ChangePasswordNamePage.module.css";

export type LoginFormData = {
  newUserStatus: string;
  newUserName: string;
  newPassword: string;
};

export type LoginResponseData = {
  loginCheck: boolean;
  userNameFile: string;
};

export default function ChangePasswordNamePage() {
  const [loginMessage, setLoginMessage] = useState("");
  const [loginUserData, setLoginUserData] = useState<LoginFormData>({
    newUserStatus: "",
    newUserName: "",
    newPassword: ""
  });
  const { request } = useAxiosRequest();
  const [loginMessageClassName, setloginMessageClassName] = useState(
    `${classes.loginMessage}`
  );
  const setUserName: FormControlProps["onChange"] = (event) => {
    setLoginUserData({ ...loginUserData, newUserName: event.target.value });
  };

  const setUserPassword: FormControlProps["onChange"] = (event) => {
    setLoginUserData({ ...loginUserData, newPassword: event.target.value });
  };

  const loginValidation = async (loginUserData: LoginFormData) => {
    const response = await request("post", "change_user_details", loginUserData);
    setloginMessageClassName(`${classes.loginMessage} ${classes.loginMessageVissible}`);
    console.log(response.data);
    if (response.data.message === true) {
      setLoginMessage(
        "your user details have been updated please login again for change to take place"
      );
    } else {
      setLoginMessage("user already exist");
    }
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    loginValidation(loginUserData);
  }

  return (
    <Form className={classes.formContainer} onSubmit={handleSubmit}>
      <h5 id="loginMessage" className={classes.loginTitle}>
        {loginMessage}
      </h5>
      <Form.Group>
        <Form.Label className={classes.label}>New Name</Form.Label>
        <Form.Control
          className={classes.input}
          type="text"
          required
          value={loginUserData.newUserName}
          onChange={setUserName}
        />
        <Form.Label className={classes.label}>New Password</Form.Label>
        <Form.Control
          className={classes.input}
          type="password"
          required
          value={loginUserData.newPassword}
          onChange={setUserPassword}
        />
      </Form.Group>
      <button type="submit" className={classes.button}>
        Save changes
      </button>
    </Form>
  );
}
