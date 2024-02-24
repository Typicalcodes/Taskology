import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import Navbar from '../components/Navbar';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Taskology";
  }, [authState]);



  return (
    <> 
      
        {!isLoggedIn ? (
          <div className='mx-auto h-screen  text-white  py-8  flex flex-col items-center  w-1/2  '>
            <h1 className='text-8xl text-[#191923] '> Welcome To <br></br><span className='font-bold'>TASKOLOGY</span> </h1>
            <div class=" bg-white my-2 ">
    <h1 class="text-3xl font-bold mb-6  text-[#191923] ">Stay organized and boost productivity with Taskology</h1>
    <p class="text-gray-600 mb-4">Create, manage, and conquer your tasks effortlessly.</p>
    <h1 class="text-3xl font-bold mb-6 text-[#191923]">Start your day right by planning tasks and achieving goals.</h1>
    <p class="text-gray-600 mb-4">Taskology is here to make it happen.</p>
    
    <h1 class="text-3xl font-bold mb-6 text-[#191923]">Effortlessly add, edit, and delete tasks.</h1>
    <p class="text-gray-600 mb-4">Your to-do list, your rules.</p>
  </div>
            <Link to="/signup" className='mt-10 text-xl  text-[#59D2FE] xblock space-x-2 hover:space-x-4'>
              <span className='transition-[margin] font-semibold'>JOIN TASKOLOGY </span>
              <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div> 
        ) : (
          
          <><MainLayout>
                <Link to='/tasks/add' className='block bg-slate-500 mx-auto text-white  mt-4 w-1/12 p-4 my-2
             hover:bg-slate-600 font-medium rounded-md  px-4 py-2'> <i className="fa-solid fa-plus"></i> Add task </Link>
            <Tasks />
            </MainLayout>
          </>
        )}
   
    </>
  )
}

export default Home