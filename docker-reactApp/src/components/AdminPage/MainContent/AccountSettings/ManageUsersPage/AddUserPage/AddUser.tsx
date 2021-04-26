import React from "react";
import { Container, Modal } from "react-bootstrap";
import AddUserModalContent from "../AddUserModalContent/AddUserModalContent";
import classes from './AddUser.module.css'

export default function AddUser() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className={classes.container} onClick={handleShow}>
        <i
        className={classes.plus}
        />
        <h1 className={classes.addUser}>
          Add Users
        </h1>
        </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ borderBottom: "white" }}></Modal.Header>
        <Modal.Body>
          <AddUserModalContent />
        </Modal.Body>
      </Modal>
    </>
  );
}
