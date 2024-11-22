import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { current, deleteUser, uploadProfilePicture } from '../Redux/Actions/AuthActions'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { getMyOrders } from '../Redux/Actions/OrderActions';
import ConfirmDelete from './ConfirmDelete';
import Table from 'react-bootstrap/Table';
import { deleteRendezVous, getAdherentRendezVous, getCoachRendezVous, updateRendezVousStatus } from '../Redux/Actions/RendezVousActions';
const Profil = () => {
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null); // Référence pour le champ de fichier

    useEffect(()=>{
        dispatch(current())
    },[])
    useEffect(()=>{
      dispatch(getMyOrders())
  },[])

  

    const user = useSelector(state => state.AuthReducer.currentUser)

    const myOrders = useSelector(state => state.orderReducer.orders)

    const rendezVous = useSelector(state => state.RendezVousReducer.rendezVous)

    useEffect(() => {
      if (user && user.role === 'adherent') {
        dispatch(getAdherentRendezVous());
      } else if (user && user.role === 'coach') {
        dispatch(getCoachRendezVous());
      }
    }, [dispatch, user]);


    if (!user) {
        return <div>Loading...</div>
    }

    const handleImageClick = () => {
      fileInputRef.current.click();
  }

    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setSelectedImage(URL.createObjectURL(file)); // Prévisualiser l'image
          handleImageUpload(file); // Uploader l'image automatiquement
      }
  }

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      dispatch(uploadProfilePicture(file, user._id));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

    const handleStatusRDVUpdate = (id, newStatus) => {
      
      dispatch(updateRendezVousStatus(id, newStatus));
    };

  const getStatusColor = (status) => {
      if (status === 'Rejected') return 'red';
      if (status === 'Accepted') return 'green';
      return 'black'; // couleur par défaut si "in progress"
    }

  return (
//     <div>

//     <div>
//             <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                 <div className="flex justify-end px-4 pt-4">
//                     {/* Dropdown menu, etc */}
//                 </div>
//                 <div className="flex flex-col items-center pb-10">
//                 <img
//                         className="w-24 h-24 mb-3 rounded-full shadow-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
//                         src={selectedImage || user.picture || "/default-profile.jpg"}
//                         alt="User profile"
//                         onClick={handleImageClick} // Clic pour choisir une nouvelle image
//                     />
//                     <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
//                     <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>

//                     {/* Champ de fichier caché */}
//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleImageChange}
//                         className="hidden"
//                         accept="image/*" // Limite aux fichiers image
//                     />

//                     <div className="flex mt-4 md:mt-6">
//                         <a href={`/updateUser/${user._id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
//                             Update Profile
//                         </a>
//                         <ConfirmDelete />
//                     </div>
//                 </div>
//             </div>
//         </div>

    
//     <h2>Mes Commandes</h2>
    
//       {myOrders && myOrders.length > 0 ? 
//        <Table striped bordered hover>
//        <thead>
//          <tr>
//            <th>Reference</th>
//            <th>Produit</th>
//            <th>Quantité</th>
//            <th>Prix</th>
//            <th>Statut</th>
//          </tr>
//        </thead>
//        <tbody>
      
//       {
//         myOrders.map((order) => (
//           // <Card key={order._id} style={{ width: '18rem', marginTop: '20px' }}>
//           //   <Card.Body>
//           //     <Card.Title>Produit : {order.product}</Card.Title>
//           //     <Card.Text>Quantité : {order.quantity}</Card.Text>
//           //     <Card.Text>Prix : {order.price}</Card.Text>
//           //     <Card.Text>Statut : {order.status}</Card.Text>
//           //   </Card.Body>
//           // </Card>
//           <tr>
//           <td>{order._id}</td>
//           <td>{order.product}</td>
//           <td>{order.quantity}</td>
//           <td>{order.price}</td>
//           <td>{order.status}</td>
//         </tr>
//         ))
//       }
//       </tbody>
//       </Table>
      
      
//       : (
//         <p>Aucune commande trouvée.</p>
//       )}

// <h2>Rendez Vous</h2>

// {
//   rendezVous && rendezVous.length > 0 ? (
//     rendezVous.map((rdv) => (
//       <Card key={rdv._id} style={{ width: '18rem', marginTop: '20px' }}>
//         <Card.Body>
//           <Card.Title>  {user.role === 'adherent' 
//     ? `Coach : ${rdv.coach?.name || 'N/A'}` 
//     : `Adherent : ${rdv.adherent?.name || 'N/A'}`} </Card.Title>
//           <Card.Text>msg : {rdv.message || "Pas de message"}</Card.Text>
//           <Card.Text>date : {rdv.date || "Pas de date"}</Card.Text>
    
//           {user.role === 'coach' ? <>
//             <Card.Title style={{ color: getStatusColor(rdv.status) }}>Status : {rdv.status}</Card.Title>
//         <Button variant='danger' onClick={() => handleStatusRDVUpdate(rdv._id, 'Rejected')} >Reject</Button>
//         <Button variant='info' onClick={() => handleStatusRDVUpdate(rdv._id, 'Accepted')}>Accept</Button>
//           </> 
//           :          
//            <Card.Text>Status : {rdv.status}</Card.Text>
//         }

//         <Button variant='info' as={Link} to={`/updateRendezVous/${rdv._id}`}>Update</Button> 
//         {
//           rdv.status  == "In progress" && <Button variant='danger' onClick={()=> dispatch(deleteRendezVous(rdv._id))}>Delete</Button>
//         }
        
//         </Card.Body>
//       </Card>
//     ))
//   ) : (
//     <p>Aucun rendez-vous trouvé.</p>
//   )
// }
//      </div>
<div className="p-6 bg-gray-100 min-h-screen">
<div className="bg-white shadow-md rounded-lg p-6 text-center mb-8">
  {/* Profile Image */}
  <div className="flex justify-center relative mx-auto mb-4">
    <img
      className="w-28 h-28 mb-3 rounded-full shadow-lg cursor-pointer hover:opacity-80 transition-opacity duration-300 border-4 border-blue-600"
      src={selectedImage || user.picture || "/default-profile.jpg"}
      alt="User profile"
      onClick={handleImageClick}
    />

    <div className="flex justify-center gap-4 mt-6">
      <button
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
            onClick={() => (window.location.href = `/updateUser/${user._id}`)}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232a3 3 0 114.243 4.243L9 19.75 3.75 21l1.25-5.25 10.482-10.518z"
            />
          </svg>
        </button>
        <div className="absolute bottom-0 right-0 translate-y-12">
            <ConfirmDelete />
        </div>
    </div>
  </div>

  {/* User Info */}
  <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
  <h3 className="text-lg font-medium text-gray-600">{user.email}</h3>
  <p className="text-sm text-gray-500 mb-6">Here's your fitness journey overview</p>

  {/* Buttons */}
  

  {/* Hidden File Input */}
  <input
    type="file"
    ref={fileInputRef}
    onChange={handleImageChange}
    className="hidden"
    accept="image/*"
  />
</div>

    {/* Stats Section */}
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h2 className="text-lg font-bold">Workouts Completed</h2>
        <p className="text-3xl text-blue-500">24</p>
        <p className="text-sm text-green-500">+3 this week</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h2 className="text-lg font-bold">Next Session</h2>
        <p className="text-3xl text-blue-500">Tomorrow, 9 AM</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h2 className="text-lg font-bold">Active Goals</h2>
        <p className="text-3xl text-blue-500">3</p>
        <p className="text-sm text-green-500">+1 this week</p>
      </div>
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h2 className="text-lg font-bold">Store Credits</h2>
        <p className="text-3xl text-blue-500">$50</p>
      </div>
    </div>
    {/* Upcoming Sessions and Orders */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold mb-2">Upcoming Sessions</h3>
        {
rendezVous && rendezVous.length > 0 ? (
// rendezVous.map((rdv) => (
//   <Card key={rdv._id} style={{ width: '18rem', marginTop: '20px' }}>
//     <Card.Body>
//       <Card.Title>  {user.role === 'adherent' 
// ? `Coach : ${rdv.coach?.name || 'N/A'}` 
// : `Adherent : ${rdv.adherent?.name || 'N/A'}`} </Card.Title>
//       <Card.Text>msg : {rdv.message || "Pas de message"}</Card.Text>
//       <Card.Text>date : {rdv.date || "Pas de date"}</Card.Text>

//       {user.role === 'coach' ? <>
//         <Card.Title style={{ color: getStatusColor(rdv.status) }}>Status : {rdv.status}</Card.Title>
//     <Button variant='danger' onClick={() => handleStatusRDVUpdate(rdv._id, 'Rejected')} >Reject</Button>
//     <Button variant='info' onClick={() => handleStatusRDVUpdate(rdv._id, 'Accepted')}>Accept</Button>
//       </> 
//       :          
//        <Card.Text>Status : {rdv.status}</Card.Text>
//     }

    // <Button variant='info' as={Link} to={`/updateRendezVous/${rdv._id}`}>Update</Button> 
    // {
    //   rdv.status  == "In progress" && <Button variant='danger' onClick={()=> dispatch(deleteRendezVous(rdv._id))}>Delete</Button>
    // }
    
//     </Card.Body>
//   </Card>
// ))
<div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
   <table className="table-auto w-full border-collapse border border-gray-200 rounded-md">
     <thead>
       <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm tracking-wider">
         <th className="px-6 py-3 border-b">Image</th>
         <th className="px-6 py-3 border-b">Name</th>
         <th className="px-6 py-3 border-b">Message</th>
         <th className="px-6 py-3 border-b">Date</th>
         <th className="px-6 py-3 border-b">Statut</th>
         <th className="px-6 py-3 border-b">Action</th>
       </tr>
     </thead>
     <tbody>
       {rendezVous.map((rdv, index) => (
         <tr
           key={index}
           className="hover:bg-gray-50 transition duration-300 ease-in-out"
         >
           <td className="px-6 py-4 border-b">
           {user.role === 'adherent' 
              ? <img
              src={rdv.coach?.picture}
              alt="Not Found"
              className="w-16 h-16 rounded-full shadow-md hover:opacity-90 cursor-pointer"
            /> 
              : <img
              src={rdv.adherent?.picture}
              alt="Not Found"
              className="w-16 h-16 rounded-full shadow-md hover:opacity-90 cursor-pointer"
            />}
             
           </td>
           <td className="px-6 py-4 border-b font-medium text-gray-700">
            {user.role === 'adherent' 
              ? ` ${rdv.coach?.name || 'N/A'}` 
              : ` ${rdv.adherent?.name || 'N/A'}`}
           </td>
           <td className="px-6 py-4 border-b text-gray-600">{rdv.message || "Pas de message"}</td>
           <td className="px-6 py-4 border-b text-gray-800 font-semibold">{rdv.date ? rdv.date.split('T')[0] : "Pas de date"}</td>
           <td className="px-6 py-4 border-b">
           {user.role === 'coach' ? <>
                    <Card.Title style={{ color: getStatusColor(rdv.status) }}> {rdv.status}</Card.Title>
                <Button variant='danger' onClick={() => handleStatusRDVUpdate(rdv._id, 'Rejected')} >Reject</Button>
                <Button variant='info' onClick={() => handleStatusRDVUpdate(rdv._id, 'Accepted')}>Accept</Button>
                  </> 
                  :          
                    <Card.Text> {rdv.status}</Card.Text>
                }
           </td>
           <td className="px-6 py-4 border-b text-gray-600">
           <Link to={`/updateRendezVous/${rdv._id}`}><i className="fa-solid fa-user-pen"></i></Link>           
           {/* <Button variant='info' as={Link} to={`/updateRendezVous/${rdv._id}`}>Update</Button>  */}
    {
      // rdv.status  == "In progress" && <Button variant='danger' onClick={()=> dispatch(deleteRendezVous(rdv._id))}>Delete</Button>
      <i
                      className="fa-solid fa-trash ms-3 cursor-pointer text-red-600"
                      onClick={()=> dispatch(deleteRendezVous(rdv._id))}
                  ></i>
    }
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
) : (
    <p className="text-gray-500">No upcoming sessions</p>
)
}
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold mb-2">Recent Orders</h3>
        {myOrders && myOrders.length > 0 ? 
   <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
   <table className="table-auto w-full border-collapse border border-gray-200 rounded-md">
     <thead>
       <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm tracking-wider">
         <th className="px-6 py-3 border-b">Image</th>
         <th className="px-6 py-3 border-b">Produit</th>
         <th className="px-6 py-3 border-b">Quantité</th>
         <th className="px-6 py-3 border-b">Prix</th>
         <th className="px-6 py-3 border-b">Statut</th>
       </tr>
     </thead>
     <tbody>
       {myOrders.map((order, index) => (
         <tr
           key={index}
           className="hover:bg-gray-50 transition duration-300 ease-in-out"
         >
           <td className="px-6 py-4 border-b">
             <img
               src={order.image}
               alt="Not Found"
               className="w-16 h-16 rounded-full shadow-md hover:opacity-90 cursor-pointer"
             />
           </td>
           <td className="px-6 py-4 border-b font-medium text-gray-700">
             {order.product}
           </td>
           <td className="px-6 py-4 border-b text-gray-600">{order.quantity}</td>
           <td className="px-6 py-4 border-b text-gray-800 font-semibold">
             ${order.price}
           </td>
           <td className="px-6 py-4 border-b">
             <span
               className={`px-3 py-1 rounded-full text-xs font-medium ${
                 order.status === "Delivered"
                   ? "bg-green-100 text-green-700"
                   : order.status === "Pending"
                   ? "bg-yellow-100 text-yellow-700"
                   : "bg-red-100 text-red-700"
               }`}
             >
               {order.status}
             </span>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
  
  : (
    <p className="text-gray-500">No orders yet</p>
  )}
      </div>
    </div>
    {/* Workout Progress */}
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-bold mb-4">Workout Progress</h3>
      {["Strength", "Cardio", "Flexibility"].map((type) => (
        <div key={type} className="mb-4">
          <p className="text-gray-700">{type}</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default Profil