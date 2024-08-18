import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProfileModal from '../Modals/ProfileModal';

function DisplayName({ getValue, row, column, table }) {
  const [name, setName] = useState(row.original.name);
  const [username, setUsername] = useState(row.original.username);
  const [pfp, setPfp] = useState(row.original.pfp);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const openModal = () => {
    setIsModalOpen(true);
    console.log('Modal open');
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    console.log('Modal close', isModalOpen);
    searchParams.delete('user');
    setSearchParams(searchParams, { replace: true });
  };

  useEffect(() => {
    setName(row.original.name);
    setUsername(row.original.username);
    setPfp(row.original.pfp);
  }, [row]);

  useEffect(() => {
    
    if (searchParams.get('user') === username) {
      openModal();
    }
  }, [searchParams, username]);

  const handleClick = () => {
    openModal(); 
    setSearchParams({ user: username }, { replace: true }); 
  };

  return (
    <div className='flex items-center gap-2'>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        row={row}
      />
      <img
        className='h-10 w-10 object-cover cursor-pointer'
        src={`${pfp}`}
        alt={username}
        onClick={handleClick} 
      />
      <div className='flex flex-col cursor-pointer' onClick={handleClick}>
        <div className='font-medium text-sm text-left'>{name}</div>
        <div className='font-normal text-sm text-customgray text-left'>@{username}</div>
      </div>
    </div>
  );
}

export default DisplayName;
