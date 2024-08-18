import React, { useEffect } from 'react'
import SearchIcon from '../assets/search.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
function Search({columnFilters,setColumnFilters}) {

    const navigate=useNavigate();
    const [searchParams,setSearchParams]=useSearchParams();


    const currentFilter=searchParams.get(`query`) || columnFilters.find(f=>f.id==='name')?.value ||"";

    const onFilterChange=(id,value)=>{
        setColumnFilters(
            prev=>prev.filter(f=>f.id!=id).concat({
                id,value
            })
        )

        if (value) {
            setSearchParams({ query: value });
            navigate(`/people?query=${value}`);
          } else {
            setSearchParams({});
            navigate('/people');
          }
    }

    useEffect(() => {
        onFilterChange('name', currentFilter);
      }, []);

  return (
    <div className='flex border border-gray-300 bg-white rounded-md px-2 py-1 items-center'>
        <input className='w-[300px] items-center text-sm ' type='text' placeholder='Search' value={currentFilter} onChange={(e)=>onFilterChange('name',e.target.value)}></input>
        <img className='h-4 w-4'src={SearchIcon}></img>
    </div>
  )
}

export default Search