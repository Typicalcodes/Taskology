import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Input from './utils/Input';
import SlidingTextBoxes from './utils/Slider';


const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [stype, setStype] = useState("");
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }
  
  useEffect(()=>{
    console.log("")
  },[search])

  const data = [
    "Slide 1: This is the content for slide 1",
    "dfas",
    "dsfae3 mn erwser"
  ];

  return (
    <>
      <div className="my-2 mx-auto max-w-[1200px] py-4">

        {tasks.length !== 0 && <><div className='flex justify-between'><h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>        
        <div className='space-x-2'>
          <select className='p-2' onChange={(e)=>{setStype(e.target.value)}}>
            <option className='p-2 appearance-none' value="title">Title</option>
            <option className='p-2 appearance-none' value="description">Description</option>
          </select>
        <input type="search" className='px-2 border-2 rounded-md h-full ' name="search" id="search" value={search} placeholder="Search" onChange={(e)=>{setSearch(e.target.value)}} />
        </div>
        </div></>}
        {loading ? (
          <Loader />
        ) : (
          <div className='flex grid-cols-4 gap-4'>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex  flex-row items-center justify-start gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              tasks.filter((item) => {
                if(search.length>0){
                  const SearchTerm = search.toLowerCase();
                  const name = stype==="title" ? item.title.toLowerCase() : item.description.toLowerCase();
                  return SearchTerm.length && name.startsWith(SearchTerm);
                }
                return item;
              }).map((task, index) => (
                <div key={task._id} className='bg-white my-4 p-4 w-full text-gray-600 rounded-md shadow-md'>
                  <span className='font-medium'>{task.title.length > 0 ? task.title : "Task "+(index+1)}</span>
                  <div className='whitespace-pre'>{task.description}</div>
                  <div className='flex'>
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 font-semibold text-green-600 cursor-pointer'>
                        Edit
                      </Link>
                      <span className='text-red-500 cursor-pointer font-semibold' onClick={() => handleDelete(task._id)}>
                        Delete
                      </span>
                  </div>
                  
                </div>
              ))

            )}
          </div>
        )}
        
      </div>
    </>
  )

}

export default Tasks