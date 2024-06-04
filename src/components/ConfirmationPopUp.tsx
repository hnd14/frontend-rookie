import React from "react";
import { Button, Modal } from "react-bootstrap";
interface Props {
  title: string;
  children: string;
  show: boolean;
  handleAccept: () => any;
  handleClose: () => any;
}
const ConfirmationPopUp = ({
  title = "",
  children = "",
  show,
  handleAccept,
  handleClose,
}: Props) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
      >
        <Modal.Header closeButton>
          <b>{title}</b>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAccept} variant="danger" className="me-1">
            Yes
          </Button>
          <Button onClick={handleClose} variant="dark">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationPopUp;
