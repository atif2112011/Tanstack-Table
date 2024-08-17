import React from 'react'
import SearchIcon from '../assets/search.svg'
function Search({columnFilters,setColumnFilters}) {

    const onFilterChange=(id,value)=>{
        setColumnFilters(
            prev=>prev.filter(f=>f.id!=id).concat({
                id,value
            })
        )
    }

    const currentFilter=columnFilters.find(f=>f.id=='name')?.value || "";
  return (
    <div className='flex border border-gray-300 bg-white rounded-md px-2 py-1 items-center'>
        <input className='w-[300px] items-center text-sm ' type='text' placeholder='Search' value={currentFilter} onChange={(e)=>onFilterChange('name',e.target.value)}></input>
        <img className='h-4 w-4'src={SearchIcon}></img>
    </div>
  )
}

export default Search