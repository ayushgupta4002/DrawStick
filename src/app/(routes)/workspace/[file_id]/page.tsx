import React from 'react'
import WorkspaceHeader from '../_components/HeaderWorkSpace'
import Editor from '../_components/Editor'

function page() {
  return (
    <div>
        <WorkspaceHeader/>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className=' h-screen'> 
<Editor/>
          </div>
          <div className='bg-red-500 h-screen'>
he
          </div>
        </div>
    </div>
  )
}

export default page