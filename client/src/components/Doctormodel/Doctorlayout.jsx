import React from 'react'
import Doctorsidebar from './Doctorsidebar'
import "./../../styles/pannel.css"

const Doctorlayout = ({children}) => {
  return (
    <div className='vrdentacontainer'>
        <div className='vrdentawrapper'>
            <Doctorsidebar/>

            {children}
              

        </div>
      
    </div>
  )
}

export default Doctorlayout
