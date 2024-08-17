import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import RedArrow from '../../assets/red_arrow.svg'
function ProfileModal({ isOpen, onClose,row }) {
    Modal.setAppElement('#root');
    const [details,setDetails]=useState(row.original.personal ||{
        'Date of Birth':'29-04-2005',
        'Gender':'Female',
        'Nationality':'Canadian',
        'Contact no.':'1234567890',
        'Email Address':'Olividesign@gmail.com',
        'Work email Address':'Olividesign@gmail.com',

    })

    const [user,setUser]=useState(row.original.name || 'Olivia Rhye')
    const [username,setUsername]=useState(row.original.username || 'olivia')
    const [role,setRole]=useState(row.original.role || 'Product Designer')
    const [pfp,setPfp]=useState(row.original.pfp || '')

    const [pub,setPub]=useState(row.original.publications ||[{
        name:'AI and User Experience',
        published:{
            journal:"Journey of Modern Design",
            year:'2022'
        },
        summary:'AI, IoT based real time condition monitoring of Electrical Machines using Python language Abstract',

        link:'xyz.com'


}])


    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          
          ariaHideApp={false}
          style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                zIndex: 1000,
            },
            content: {
              position: 'relative',
              top: '55%',
              left: 'auto',
              right: '-74%',
              bottom: 'auto',
              
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '0px',
              width:'50%',
              height:'85%'
            },
          }}
        >
          <div className='flex flex-col p-2 gap-1'>
            <div className='flex p-2 items-center gap-4 bg-darkblue'>
                <img  src={pfp} alt="profile" className='h-16 w-16 object-cover'/>
                <div className='flex flex-col gap-1 text-xl font-semibold text-white'>
                   {user}
                    <div className='flex gap-2'>
                        <div className='flex flex-col text-sm text-white border-white-600 border-r pr-2'>
                            <p className='font-normal'>@{username}</p>
                            <p className='font-medium'>User ID</p>
                        </div>
                        <div className='flex flex-col text-sm text-white'>
                            <p className='font-normal'>{role}</p>
                            <p className='font-medium'>Role</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col py-1'>
                <div className='bg-lightblue text-md px-2 py-1 rounded-sm font-semibold'>
                    Personal Information
                </div>
                {Object.entries(details).map(([heading, data]) => (
        <div key={heading} className='flex gap-10 border-b border-gray-300 py-2 mx-2'>
          <div className='text-sm font-medium w-1/3'>{heading}</div>
          <div className='text-sm text-gray-400 w-2/3'>{data}</div>
        </div>
      ))}
            </div>

            <div className='flex flex-col gap-1'>
            <div className='bg-lightblue text-md px-2 py-1 rounded-sm font-semibold'>
            Research & Publication
            </div>
            <div className='flex flex-col gap-1'>
                {pub.map((publication, index) => (
                    <div key={index} className='flex flex-col gap-0.5 px-2 border-b border-gray-300'>
                        
                        <div className='font-semibold text-sm'>
                            {publication.name}
                        </div>
                        
                        <div className='text-xs font-normal'>
                            Published in {publication.published.journal} : {publication.published.year}
                        </div>
                        
                        <div className='text-xs font-normal'>
                            {publication.summary}
                        </div>
                        {/* Link to Publication */}
                        <div className='text-md'>
                            <a href={publication.link} className='text-red-500 flex gap-3 items-center tex-sm font-semibold p-2'>
                                <img src={RedArrow} className='h-3 w-3'/>
                                SEE PUBLICATION
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            </div>
          </div>
        </Modal>
    );
}

export default ProfileModal;
