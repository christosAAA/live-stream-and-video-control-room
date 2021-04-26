import React, { useContext } from "react";
import { UsersInfoContext } from "../contexts/UsersInfoCreateContext";

type UserListProps = { userStatus: string; userName: string; password: string };

export const useUsersInfo = () => {
  const usersInfoContext = useContext(UsersInfoContext);

  const usersInfo = () => {
    let usersArray: UserListProps[] = [];
    Object.values(usersInfoContext).forEach((item: UserListProps) => {
      usersArray.push(item);
    });
    return usersArray;
  };

  return { usersInfo };
};
