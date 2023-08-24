import React from 'react'
import Button from '@mui/material/Button'
import modalStyle from '../styles/modalStyle';

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyle.modalOverlay}>
            <div style={modalStyle.confirmationModalContainer}>
                <p style={modalStyle.text}>Êtes vous certain de vouloir supprimer ce livre ?</p>
                <Button onClick={onConfirm} style={modalStyle.text}>Oui</Button>
                <Button onClick={onCancel} style={modalStyle.text}>Annuler</Button>
            </div>

        </div>
    )
}

export default DeleteModal;