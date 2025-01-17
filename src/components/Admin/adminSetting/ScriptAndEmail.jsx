
import LeadFormEmailComponent from '@/components/Admin/leadform'
import ScriptManager from '@/components/Admin/scriptmanager'
import React, { useState } from 'react'

const ScriptAndEmail = () => {
    const [activeBox, setActiveBox] = useState(1);
  
    const handleClick = (box) => {
      setActiveBox(box);
    };
  
  const getTabClass = (id) =>
    `cursor-pointer px-4 py-2 text-xs transition-all duration-300 ease-in-out rounded-md border 
     ${activeBox === id ? 'bg-gradient-to-r from-black to-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-black hover:text-white'}`;

  return (
    <div className='mt-5 bg-white'>
      <div className='bg-white flex gap-3 p-5'>
        <span className={getTabClass(1)} onClick={() => handleClick(1)}>Script</span>
        <span className={getTabClass(2)} onClick={() => handleClick(2)}>Form Emails Update</span>
      </div>
      <div className='  p-3'>
        {activeBox === 1 && <div className='w-full'><ScriptManager /></div>}
        {activeBox === 2 && <div  className='w-full'><LeadFormEmailComponent /></div>}
      </div>

      
      
    </div>
  )
}

export default ScriptAndEmail;