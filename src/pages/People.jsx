import React, { useState } from 'react'
import {flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import users from '../DATA.js'
import DisplayName from '../components/DisplayComponents/DisplayName.jsx'

import DisplayStatus from '../components/DisplayComponents/DisplayStatus.jsx'
import DisplayRole from '../components/DisplayComponents/DisplayRole.jsx'
import DisplayEmail from '../components/DisplayComponents/DisplayEmail.jsx'
import DisplayTeams from '../components/DisplayComponents/DisplayTeams.jsx'
import DisplayButtons from '../components/DisplayComponents/DisplayTrash.jsx'
import Up from '../assets/up.svg'
import Down from '../assets/down.svg'
import left from '../assets/left.svg'
import right from '../assets/right.svg'
import Filter from '../assets/filter.svg'
import Search from '../components/Search.jsx'
import plus from '../assets/plus.svg'
import DropdownFilter from '../components/DropDownFilter.jsx'
import AddMemberModal from '../components/Modals/EditModal.jsx'

function People() {
    const [data,setData]=useState(users)
    const [columnFilters,setColumnFilters]=useState([])
    const [isaddModalOpen,setIsaddModalOpen]=useState(false)

    //User Modal
    const openAddModal = () => {
        setIsaddModalOpen(true);
        console.log(`Add Modal open`,isaddModalOpen)
      };
    
      const closeAddModal = () => {
        setIsaddModalOpen(false);
        console.log(`Add Modal close`,isaddModalOpen)
      };
  


    const columns=[
        {
            accessorKey:'name',
            header: 'Name',
            size: 280, // Adjust size as needed
            cell:DisplayName
          },
        {
          accessorKey:'status',
          header:'Status',
          size:110,
          cell:DisplayStatus
        },
        {
          accessorKey:'role',
          header:'Role',
          size:180,
          cell:DisplayRole,
          enableSorting: false,
        },
      
        {
          accessorKey:'email',
          header:'Email address',
          cell:DisplayEmail,
          size:210,
          enableSorting: false,
        },
      
        {
          accessorKey:'teams',
          header:'Teams',
          cell:DisplayTeams,
          size:284,
          enableSorting: false,
        },
        {
            header:'Action',
            cell:(props)=><DisplayButtons props={props} setData={setData}/>,
            size:200,
            enableSorting: false,
        }
        
      
      
      ]
      
        
        const table=useReactTable({
          data,
          columns, 
          state:{
            columnFilters,
            // pagination:{
            //   pageSize:5,
            //   pageIndex:0
               
            // }
          },
          getFilteredRowModel:getFilteredRowModel(),
          getSortedRowModel:getSortedRowModel(),
          getCoreRowModel:getCoreRowModel(),
          getPaginationRowModel:getPaginationRowModel(),                     
          meta:{
            //Updates first column
            updateData:(rowIndex,columnId,value)=>{
              setData(
                prev=>prev.map((row,index)=>
                  index==rowIndex?{
                  ...prev[rowIndex],[columnId]:value
                  }:row
                )
              )
            }
            ,
            deleteData: (rowIndex) => {
                setData(prev => prev.filter((row, index) => index != rowIndex));
              }
      
          }
        })
      
        console.log(data)
        console.log(`Column Filter:`,columnFilters)
        
      
  return (
    <div>
         <AddMemberModal
        isOpen={isaddModalOpen}
        onClose={closeAddModal}
        setData={setData}
        
      >

      </AddMemberModal>
        <div className='flex p-2 justify-between'>
            <div className='flex p-1 gap-2 items-center'>
                <p className='text-lg font-semibold'>Team members</p>
                <div className='border border-2 border-team1bg-500 rounded-lg font-medium text-xs py-0.5 px-1  bg-team1bg text-team1 items-center h-min'>{data.length} users
        </div> 
            </div>
            <div className='flex gap-1'>
                <Search columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
                {/* <img className='h-4 w-4' src={Filter}></img> */}
                <DropdownFilter columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
                <button className='bg-secondary text-white px-2 py-1 items-center flex gap-2 text-sm tracking-wide font-medium rounded-lg' onClick={openAddModal}>
                <img className='h-4 w-4' src={plus}></img> ADD MEMBER</button>
            </div>

        </div>
        <table className="table m-0">
  <thead>
    {
      table.getHeaderGroups().map(headerGroup => (
        <tr className="tr" key={headerGroup.id}>
          {
            headerGroup.headers.map(header => (
                <th className='text-xs font-medium text-gray-500 border-t border-b border-gray-300 p-3' key={header.id} style={{ width: header.getSize() }}>
                <div className='flex items-center gap-4'>
                  
                  {header.column.columnDef.header}
                  
                 
              
                  
                  {header.column.getCanSort() && (
                    <div onClick={header.column.getToggleSortingHandler()} className='flex items-center'>
                      {!header.column.getIsSorted() && <img className='h-4 w-4 cursor-pointer' src={Up} />}
                      {header.column.getIsSorted() === 'asc' && <img className='h-4 w-4 cursor-pointer' src={Down} />}
                      {header.column.getIsSorted() === 'desc' && <div className='cursor-pointer'>Reset</div>}
                    </div>
                  )}
                </div>
              </th>
            ))
          }
        </tr>
      ))
    }
  </thead>
  <tbody>
    {
      table.getRowModel().rows.map((row,index) => (
        <tr className={`tr ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={row.id}>
          {
            row.getVisibleCells().map(cell => (
              <td className='border-t border-b border-gray-300 p-3' key={cell.id} style={{ width: cell.column.getSize() }}>
                {
                  // Accessing the cell React component
                  flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                }
              </td>
            ))
          }
        </tr>
      ))
    }
  </tbody>
</table>
<div className='flex justify-between'>
<button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='items-center flex gap-2 text-sm font-medium border border-gray-300 rounded-lg px-3 py-1 m-3'
        >
        <img src={left} className='h-3 w-3'/>
        Previous
        </button>
        <div className='items-center p-2 text-sm font-medium border border-gray-300 rounded-lg h-min m-3'>Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}</div>
<button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='items-center flex gap-2 text-sm font-medium border border-gray-300 rounded-lg px-3 py-1 m-3'
        >
            Next
        <img src={right} className='h-3 w-3'/>
        </button>
</div>


    </div>
  )
}

export default People