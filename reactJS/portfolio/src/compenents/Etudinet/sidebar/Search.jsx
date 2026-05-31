
import React from 'react'
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className='flex items-center bg-white border border-1 border-black rounded-lg py-1 px-2'>
        <CiSearch className='' />
        <input type="text" placeholder="Search"  className='outline-none  border-1 rounded-lg '/>

    </div>
  )
}

export default Search