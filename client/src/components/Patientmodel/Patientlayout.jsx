import React from 'react'
import Patientsidebar from './Patientsidebar'
import "./../../styles/pannel.css"

const Patientlayout = ({children}) => {
  return (
    <div className='vrdentacontainer'>
        <div className='vrdentawrapper'>
            <Patientsidebar/>

            {children}
              

        </div>
      
    </div>
  )
}

export default Patientlayout;
