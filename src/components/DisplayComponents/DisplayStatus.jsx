import React, { useEffect, useState } from 'react'
import dot from '../../assets/dot.svg'
import dot_red from '../../assets/dot_red.svg'
import ProfileModal from '../Modals/ProfileModal';
function DisplayStatus({getValue,row,column,table}) {
    const [status,setStatus]=useState(getValue)

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
      setStatus(getValue())
  },[getValue])
  return (
    <>
    <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        row={row}
      >

      </ProfileModal>
    <div className='border border-2 border-gray-300 rounded-md h-5 w-15 flex gap-1 items-center py-0.5 px-1+ w-16 justify-center h-min cursor-pointer' onClick={openModal}>
      
        <img src={status=='Active'?dot:dot_red} className='h-2 w-2 ' />
        <div className='font-medium text-xs'>{status} </div>
    </div>
    </>
  )
}

export default DisplayStatus