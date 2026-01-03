import React from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import Login from './Login';

const Protectedroute = () => {
    const token=localStorage.getItem("token");



if(!token){
    return <Navigate to={"/login"} replace/>
}
   

   
  return (
   
    <Outlet />
   
  )
}

export default Protectedroute;
