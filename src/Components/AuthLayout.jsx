
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

export default function AuthLayout() {
  return <>
  <Navbar/>
  <div className='flex  justify-center items-center min-h-[80vh]'>
  <Outlet/>

  </div>
 
  </>
}
