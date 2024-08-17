import React, { useEffect, useState } from 'react'
import ProfileModal from '../Modals/ProfileModal';
function DisplayEmail({getValue,row,column,table}) {
    const [email,setEmail]=useState(getValue)
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  
    const openModal = () => {
      setIsModalOpen(true);
      console.log(`Modal open`,isModalOpen)
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      console.log(`Modal close`,isModalOpen)
    };

    useEffect(()=>{
        setEmail(getValue())
    },[getValue])
    return (
        <>
         <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        row={row}
      >

      </ProfileModal>
        <div className='items-center text-gray-500 font-normal text-sm text-left cursor-pointer' onClick={openModal}>{email}</div>
        </>
    )
}

export default DisplayEmail