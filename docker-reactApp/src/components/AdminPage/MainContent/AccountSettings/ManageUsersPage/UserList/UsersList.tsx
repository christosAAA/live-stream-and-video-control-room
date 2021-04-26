import React, { useState, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useUsersInfo } from "../../../../../../hooks/useUsersInfo";
import { useAxiosRequest } from "../../../../../../hooks/useAxiosRequest";
import classes from './UserList.module.css'

type UserListProps = { userStatus: string; userName: string; password: string };

export default function UsersList() {
  const { usersInfo } = useUsersInfo();
  let usersList = usersInfo();
  const { request } = useAxiosRequest();

  const deleteUser = async (userToDelete: String,userName:String) => {
    if (!window.confirm(`Delete user ${userName}?`)) return;
    await request("post", "/delete_user", {
      deleteUser: userToDelete
    });
  };
  const userList = usersList.map((item: UserListProps, key) => {
    const userStatus = item.userStatus;
    const userName = item.userName;
    const userId = "user" + (key + 1);
    // check if user is admin for the list Badge
    let admin = false;
    if (userStatus == "admin") {
      admin = true;
    }
    console.log(userStatus, userId, userName);
    return (
      <ListGroup.Item className={classes.listGroup}
        action
        key={key}
        // style={{ borderColor: "white" }}
        onClick={() => deleteUser(`${userId}`,userName)}
      >
      <div className={classes.userNameBagde}>
        {userName}
        {admin ? (
          <div className={classes.bagde}>
            {userStatus}
          </div>
        ) : (
          ""
        )}
        </div>
        <i className={classes.deleteIcon} />
        
      </ListGroup.Item>
    );
  });
  return <>{userList}</>;
}
