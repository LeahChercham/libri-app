import React, { useState } from 'react';

const style = {
    image: {
        maxHeight: 100,
        maxWidth: 100
    }
}
function UserRow({ utilisateur }) {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = () => {
        // Implement the update logic here
        // You'll need to update the utilisateur data in the database
        toggleEdit();
    };

    const handleCancel = () => {
        // Cancel any changes made while editing
        // You might need to reset the utilisateur data
        toggleEdit();
    };

    const handleDelete = () => {
        // Implement the delete logic here
        // You'll need to show a confirmation dialog and delete the utilisateur from the database
    };

    return (
        <tr>
            <td>{utilisateur.UID}</td>
            <td>{utilisateur.NOM}</td>
            <td>{utilisateur.PRENOM}</td>
            <td>{utilisateur.ADRESSE}</td>
            <td>{utilisateur.CP}</td>
            <td>{utilisateur.VILLE}</td>
            <td>{utilisateur.NUMERO}</td>
            <td>{utilisateur.EMAIL}</td>

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


        </tr>
    );
}

export default UserRow;
