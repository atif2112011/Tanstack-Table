import React, { useEffect, useState } from 'react'
import ProfileModal from '../Modals/ProfileModal';

function DisplayName({getValue,row,column,table}) {
    const [name,setName]=useState(row.original.name)
    const [username,setUsername]=useState(row.original.username)
    const [pfp,setPfp]=useState(row.original.pfp)



    const [isModalOpen, setIsModalOpen] = useState(false);
  
  
    const openModal = () => {
      setIsModalOpen(true);
      console.log(`Modal open`)
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      console.log(`Modal close`,isModalOpen)
    };


    useEffect(()=>{
      setName(row.original.name);
      setUsername(row.original.username);
      setPfp(row.original.pfp);
    },[row])
    
  return (
    <div className='flex items-center gap-2'>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        row={row}
      >

      </ProfileModal>
        <img className='h-10  w-10 object-cover'src={`${pfp}`} alt={username}  onClick={openModal}/>
        <div className='flex flex-col'  onClick={openModal}>
            <div className='font-medium text-sm text-left'>{name}</div>
            <div className='font-normal  text-sm text-customgray text-left'>@{username}</div>
        </div>
    </div>
  )
}

export default DisplayName