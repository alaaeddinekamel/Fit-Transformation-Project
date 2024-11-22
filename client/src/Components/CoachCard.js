import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { current, deleteUser, updateUser } from '../Redux/Actions/AuthActions';
import RendezVous from './RendezVous';

const CoachCard = ({coach}) => {

  const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);

   


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const [name,setName]= useState(coach.name)
    const [email,setEmail]= useState(coach.email)
    const [role,setRole]= useState(coach.role)

    const handleUpdate=(a)=>{
      a.preventDefault()
      dispatch(updateUser(coach._id,{name,email,role},navigate))
  }
  useEffect(()=>{
    dispatch(current())
},[])
  
  return (
  //   <Card style={{ width: '18rem' }}>
  //   <Card.Body>
  //     <Card.Title>{coach.name}</Card.Title>
  //     <Card.Text>
  //         {coach.email}
  //     </Card.Text>
  //     <Button variant='info' as={Link} to={`/RendezVous/${coach._id}`}>Get in touch</Button>
  //   </Card.Body>
  // </Card>

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className="p-4">
                  <div className="flex items-center">
                      <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
              </th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">User type</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Appointment</th>
          </tr>
      </thead>
      <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                  <div className="flex items-center">
                      <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className= "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
              </td>
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full" src={coach.picture} alt="User avatar"/>
                  <div className="ps-3">
                      <div className="text-base font-semibold">{coach.name} </div>
                      <div className="font-normal text-gray-500">{coach.email}</div>
                  </div>  
              </th>
              <td className="px-6 py-4">{coach.role}</td>
              <td className="px-6 py-4">
                  <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                  </div>
              </td>
              <td className="px-6 py-4">
                  {/* <button onClick={toggleModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit user
                  </button> */}
                  <i class="fa-solid fa-user-pen" onClick={toggleModal}></i>
                  <i
                      className="fa-solid fa-trash ms-3 cursor-pointer text-red-600"
                      onClick={()=>{dispatch(deleteUser(coach._id))}}
                  ></i>
              </td>
              <td className="px-6 py-4"><RendezVous coach={coach} /></td>
          </tr>
      </tbody>
  </table>

  {/* Modal */}
  {isModalOpen && (
      <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50"
      >
          <div className="relative w-full max-w-2xl max-h-full">
              <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit user</h3>
                      <button
                          type="button"
                          onClick={toggleModal}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                              <input
                                  value={name} onChange={(e)=>setName(e.target.value)}
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  placeholder="Bonnie"
                                  required
                              />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                              <input
                                  value={email} onChange={(e)=>setEmail(e.target.value)}
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  placeholder="example@company.com"
                                  required
                              />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                              <input
                                  value={role} onChange={(e)=>setRole(e.target.value)}
                                  type="text"
                                  name="role"
                                  id="role"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  required
                              />
                          </div>
                      </div>
                  </div>
                  <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button type="submit" onClick={(e)=>handleUpdate(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                          Save all
                      </button>
                      <button type="button" onClick={toggleModal} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                          Cancel
                      </button>
                  </div>
              </form>
          </div>
      </div>
  )}
</div>

  )
}

export default CoachCard