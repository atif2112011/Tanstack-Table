import React, { useState } from 'react';
import Modal from 'react-modal';
import trash from "../../assets/trash.svg";
import edit from "../../assets/edit.svg";
import EditModal from '../Modals/EditModal';

// Set the app element for accessibility
Modal.setAppElement('#root');

function DisplayButtons({props,setData}) {

   let { row, table }=props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const openEditModal = () => {
        setIsEditModalOpen(true);
        console.log(`Edit modal Open`)
    };
    
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        console.log(`Edit modal closed`)
    };

  const handleDelete = () => {
    table.options.meta?.deleteData(row.index);
    console.log(`Deleted row at index`, row.index);
    setIsModalOpen(false);
  };

  return (
    <>
    <EditModal
    isOpen={isEditModalOpen}
    onClose={closeEditModal}
    setData={setData}
    row={row}
    >
        
    </EditModal>
    <div className='flex gap-4 w-full'>
      <img 
        className='h-5 w-5 cursor-pointer' 
        src={trash} 
        alt='delete' 
        onClick={openModal}
      />
      <img 
        className='h-5 w-5 cursor-pointer' 
        src={edit} 
        alt='edit'
        onClick={openEditModal}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Member Details"
        className="bg-white border border-white-300 rounded-lg shadow-lg p-6 w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete the member details? This action cannot be undone.</p>
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-secondary text-white px-4 py-2 rounded-md"
          >
            DELETE
          </button>
        </div>
      </Modal>


    </div>
    </>
  );
}

export default DisplayButtons;
