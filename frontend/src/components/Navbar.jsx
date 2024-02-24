import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();


  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-slate-900 text-white shadow-sm items-center'>
        <h2 className='cursor-pointer uppercase font-medium'>
          <Link to="/" className='border-2 border-white rounded'> Taskology </Link>
        </h2>
        <ul className='hidden md:flex gap-4 uppercase   items-center font-medium'>
          {authState.isLoggedIn ? (
            <>
            <li className=''> {authState.user.name}</li>
              <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm' onClick={handleLogoutClick}>Logout</li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm'><Link to="/login">Login</Link></li>
          )}
        </ul>
      </header>
    </>
  )
}

export default Navbar