import { useEffect, useState} from "react";
import { useSocket } from "./SocketProvider";
import {
  UserInfoFromFileProps,
  UsersInfoContext
} from "./UsersInfoCreateContext";


export const UsersInfoProvider: React.FC = ({ children }) => {
  const {socket} = useSocket();
  const [usersInfo, setUsersInfo] = useState<UserInfoFromFileProps>({});

  useEffect(() => {
    socket.emit("getUserListRequest");
  }, [socket]);

  useEffect(() => {
    socket.on("getUserListResponse", async (response: UserInfoFromFileProps) => {
      console.log("USERINFO")
      setUsersInfo(response);
    });
  }, [socket])



  return (
    <UsersInfoContext.Provider value={usersInfo}>
      {children}
    </UsersInfoContext.Provider>
  );
};
