import React from 'react'

function MainBody({children}) {
  return (
    <div className='flex-1 h-full p-4'>
      <div className='h-full bg-white-500 border border-border-500 rounded-md'>
        {children}
      </div>
    </div>
  )
}

export default MainBody