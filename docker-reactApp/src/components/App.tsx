import React, { useState } from "react";
import { SocketProvider } from "../contexts/SocketProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./LoginPage/Login";
import AdminPage from "./AdminPage/AdminPage";
import VideoPlayer from "./VideoPlayerLandingPage/VideoPlayer";

import { LoginResponseData } from "./LoginPage/Login";
import { UsersInfoProvider } from "../contexts/UsersInfoProvider";
import { CurrentUserContext } from "../contexts/CurrentUserCreateContext";
import {LiveVideoProvider} from "../contexts/LiveVideoProvider"
import { UpcScan } from "react-bootstrap-icons";


export type LoginResponseProps = {
  loginCheck: boolean;
  userStatus: string;
  userName: string;
  password:string;
};

export default function App() {
  const [loginResponse, setLoginResponse] = useState<LoginResponseProps>({
    loginCheck: false,
    userStatus: "",
    userName: "",
    password:""
  });

  const onResponse = (loginResponseData: LoginResponseData) => {
    console.log("from login data", loginResponseData, typeof loginResponseData);
    if (loginResponseData.loginCheck === true) {
      setLoginResponse({
        loginCheck: true,
        userStatus: loginResponseData.userStatus,
        userName: loginResponseData.userNameFile,
        password: loginResponseData.password
      });
    }
  };

  return (
    // <div>
      <SocketProvider>
        <UsersInfoProvider>
          <LiveVideoProvider>
          <CurrentUserContext.Provider value={loginResponse}>
            <Router>
              <Switch>
                <Route path="/admin">
                  {loginResponse.loginCheck ? (
                    <AdminPage />
                  ) : (
                    <Login onResponse={onResponse} />
                  )}
                </Route>
                <Route path="/">
                  <VideoPlayer />
                </Route>
              </Switch>
            </Router>
          </CurrentUserContext.Provider>
          </LiveVideoProvider>
        </UsersInfoProvider>
      </SocketProvider>
    // </div>
  );
}

