import React, { useState } from 'react';

const style = {
  image: {
    maxHeight: 100,
    maxWidth: 100
  }
}
function BookRow({ book, isAdmin }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    // Implement the update logic here
    // You'll need to update the book data in the database
    toggleEdit();
  };

  const handleCancel = () => {
    // Cancel any changes made while editing
    // You might need to reset the book data
    toggleEdit();
  };

  const handleDelete = () => {
    // Implement the delete logic here
    // You'll need to show a confirmation dialog and delete the book from the database
  };

  return (
    <tr>
      <td><img src={book.LIENIMAGE} style={style.image} /></td>
      <td>{book.LID}</td>
      <td>{book.TITRE}</td>
      <td>{book.ANNEE ? new Date(book.ANNEE).getFullYear() : ""}</td>
      <td>{book.PAGES}</td>
      <td>{book.AUTHORS}</td>
      {isAdmin && (
        <>
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
        </>
      )}
    </tr>
  );
}

export default BookRow;
