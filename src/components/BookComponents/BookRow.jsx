import React, { useState } from 'react';
import DeleteModal from './DeleteModal';
import Axios from 'axios'
import consts from '@/consts';
import { CREATE_ROUTE } from '@/consts';

const style = {
  image: {
    maxHeight: 100,
    maxWidth: 100
  }
}
function BookRow({ book, isAdmin, getBooks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const deleteBook = async () => {
    let LID = book.LID

    try {
      const response = await Axios.delete(CREATE_ROUTE(`livre/${LID}`))
      console.log(response);
      if (response.status === 200) {
        window.alert('Livre supprimé')
        getBooks()
        setIsDeleteModalOpen(false);
        // maybe call function to 'get books' again 
      } else {
        window.alert('Erreur lors de la suppression')
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      window.alert('Erreur lors de la suppression')
      setIsDeleteModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }



  const handleModalConfirm = () => {
    // Perform delete action here
    deleteBook()
    setIsDeleteModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsDeleteModalOpen(false);
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
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onCancel={handleModalCancel}
              onConfirm={handleModalConfirm}
            />
          </td>
        </>
      )}
    </tr>


  );
}

export default BookRow;
