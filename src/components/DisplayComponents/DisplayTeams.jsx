import React, { useState } from 'react'
import ProfileModal from '../Modals/ProfileModal';
function DisplayTeams({getValue,row,column,table}) {

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

  return (
    <>
    <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        row={row}
      >

      </ProfileModal>
    <div className='flex gap-1 cursor-pointer'onClick={openModal} >
       <div className='border border-2 border-team1bg-500 rounded-2xl font-medium text-xs p-1 bg-team1bg text-team1 items-center'>Design
        </div> 
       <div className='border border-2 border-team2bg-500 rounded-2xl font-medium text-xs p-1 bg-team2bg text-team2 items-center'>Product
        </div> 
       <div className='border border-2 border-team3bg-500 rounded-2xl font-medium text-xs p-1 bg-team3bg text-team3 items-center'>Marketing
        </div> 
       <div className='border border-2 border-team3bg-500 rounded-2xl font-medium text-xs p-1 bg-gray text-gray-600 items-center'>+4
        </div> 
    </div>
    </>
  )
}

export default DisplayTeams