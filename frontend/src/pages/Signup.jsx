import React, { useEffect } from 'react'
import SignupForm from '../components/SignupForm';
import MainLayout from '../layouts/MainLayout'

const Signup = () => {

  useEffect(() => {
    document.title = "Signup";
  }, []);
  return (
    <>
        <SignupForm />
    </>
  )
}

export default Signup