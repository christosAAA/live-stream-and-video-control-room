import React from 'react'
import { Container, Row } from 'react-bootstrap'
import UsersList from './UserList/UsersList'
import AddUser from './AddUserPage/AddUser'
import classes from './ManageUserPage.module.css'

export default function ManageUsersPage() {
  return (
    <Container className={classes.container}>
      <Row>
        <AddUser />
        <UsersList />
      </Row>
    </Container>
  )
}
