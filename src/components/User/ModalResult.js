import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult, handleShowAnswer } = props;
    const handleClose = () => setShow(false);
    const { t } = useTranslation();

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('quiz.result')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{t('Số lượng câu hỏi')}: <b>{dataModalResult.countTotal} </b></div>
                    <div>{t('Số câu đã chọn đáp án')}: <b>{dataModalResult.countCorrect} </b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        {t("Hiển thị đáp án")}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('Đóng')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;