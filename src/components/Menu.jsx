import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import selectedIcon2 from '../assets/Menu_Icon.png'
import selectedIcon1 from '../assets/Menu_Icon_sel.png'
function Menu() {
  return (
    <div className='flex w-[240px] p-6 font-medium'>
      <nav>
        <ul>
          <li>
          <NavLink
            to='/dashboard'
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 ${isActive ? 'text-secondary' : ''}`
            }
          >
           
           {({ isActive }) => (
              <>
                <img
                  src={isActive ? selectedIcon1 : selectedIcon2}
                  alt="Icon"
                  className='w-6 h-6'
                />
                Overview
              </>
            )}
          </NavLink>
          </li>
          <li>
          <NavLink
            to='/people'
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 ${isActive ? 'text-secondary' : ''}`
            }
          >
           
           {({ isActive }) => (
              <>
                <img
                  src={isActive ? selectedIcon1 : selectedIcon2}
                  alt="Icon"
                  className='w-6 h-6'
                />
                People Directory
              </>
            )}
          </NavLink>
          </li>
          <li>
     
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu