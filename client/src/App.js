import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import 'flowbite';
import NavFit from './Components/NavFit';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Profil from './Components/Profil';
import PrivateRoute from './Components/PrivateRoute';
import UpdateProfil from './Components/UpdateProfil';
import ListUsers from './Components/ListUsers';
import UpdateProduct from './Components/Product/UpdateProduct';
import ProductsPage from './Components/Product/ProductsPage';
import ProductDetailP from './Components/Product/ProductDetailP';
import Cart from './Components/Product/Cart';
import CommandesList from './Components/Commandes/CommandesList';
import UpdateCommande from './Components/Commandes/UpdateCommande';
import ListCoachs from './Components/ListCoachs';
import RendezVous from './Components/RendezVous';
import UpdateRendezVous from './Components/UpdateRendezVous';
import PrivateRootAdmin from './Components/PrivateRootAdmin';
import AdminDashboard from './Components/AdminDashboard';
import Footer from './Components/Footer';
import ProductListAdmin from './Components/Product/ProductListAdmin';

function App() {
  
 
  return (
    <div style={{display :'flex', flexDirection :'column'}}>
      <NavFit/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Profil' element={<PrivateRoute><Profil/></PrivateRoute> }/>
        <Route path='/updateUser/:id' element={<UpdateProfil/>} />
        <Route path='/ProductPage' element={<ProductsPage/>} />
        <Route path='/UpdateProduct/:id' element={<UpdateProduct/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path='/UpdateCommande/:id' element={<UpdateCommande/>} />
        <Route path='/ListCoachs' element={<ListCoachs/>} />
        <Route path='/RendezVous/:id' element={<RendezVous/>} />
        <Route path='/updateRendezVous/:id' element={<UpdateRendezVous/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
          {/* Routes internes */}
          <Route path='ListCoachs' element={<ListCoachs/>} />
          <Route path="CommandesList" element={<CommandesList />} />
          <Route path="ListUsers" element={<ListUsers />} />
          <Route path='ProductListAdmin' element={<ProductListAdmin/>} />
          </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
