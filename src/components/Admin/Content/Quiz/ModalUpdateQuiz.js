import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import { toast } from "react-toastify";
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {

        if (!_.isEmpty(dataUpdate)) {
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setType(dataUpdate.type);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }

        }

    }, [props.dataUpdate]
    );
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }
    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        setDataUpdate({});
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" >Name</label>
                            <input
                                type="name"
                                className="form-control"
                                value={name}
                                disabled
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">description</label>
                            <input type="description"
                                className="form-control"
                                value={description}
                                disabled
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <input type="type"
                                className="form-control"
                                value={type}
                                onChange={(event) => setType(event.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Image</label>
                            <select className="form-select" onChange={(event) => setImage(event.target.value)}
                                value={image}>
                                <option selected value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'><FcPlus />Upload File Image</label>
                            <input type="file"
                                id="labelUpload" hidden
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateQuiz;
