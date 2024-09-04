import { set } from "lodash";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizForAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;
    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuizForAdmin(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xac Nhan Xoa Quiz ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Dong y xoa email cua user.email=
                    <b>
                        {dataDelete && dataDelete.email ? dataDelete.email : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteQuiz() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteQuiz;