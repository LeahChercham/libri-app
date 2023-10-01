import React, { useState } from 'react';

const style = {
    image: {
        maxHeight: 100,
        maxWidth: 100
    }
}
function BorrowRow({ borrow }) {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = () => {
        // Implement the update logic here
        // You'll need to update the borrow data in the database
        toggleEdit();
    };

    const handleCancel = () => {
        // Cancel any changes made while editing
        // You might need to reset the borrow data
        toggleEdit();
    };

    const handleDelete = () => {
        // Implement the delete logic here
        // You'll need to show a confirmation dialog and delete the borrow from the database
    };

    return (
        <tr>
            <td>{borrow.EID}</td>
            <td>{borrow.appellation}</td>
            <td>{borrow.dateemprunt}</td>
            <td>{borrow.dateretourprevu}</td>
            <td>{borrow.dateretourreel}</td>
            {/* to do : user and books and statut*/}

            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <button onClick={toggleEdit}>Modify</button>
                )}
            </td>
            <td>
                <button onClick={handleDelete}>Delete</button>
            </td>
            <td>{borrow.prenom & " " & borrow.nom}</td>
            <td>{borrow.livres}</td>


        </tr>
    );
}

export default BorrowRow;

