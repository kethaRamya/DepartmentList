import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
export function ModalForm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [add, setAdd] = useState('')

  const OnHandleClick = () => {
    let token = JSON.parse(localStorage.getItem('login'))
    let formData = { "name": add }

    console.log("token", token.store)
    fetch("http://15.206.118.222:5000/admin/department/add", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Authorization': 'Bearer ' + token.store,
        'content-type': 'application/json',
        'Accept': 'application/json'

      }
    }).then((response) => response.json().then((result) => {
      console.log("response", result)
      handleClose()
      if (result.status == 200) {
        alert(result.msg)
        props.renderList()
      }
    }))
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
        </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Woohoo, you're reading this text in a modal! */}
          <input type="text" placeholder="Add the post" onChange={(event) => { setAdd(event.target.value) }} class="input_st" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={OnHandleClick}>
            Add
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}