import React, { useEffect } from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../Redux/Actions/AuthActions';
import { getProducts } from '../Redux/Actions/ProductActions';

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.AuthReducer.users)
  const products = useSelector(state => state.ProductReducer.products);

  useEffect(()=>{
      dispatch(getUsers())
      dispatch(getProducts())
  },[])

  const cards = [
    { title: "Total Users", count: users.length, icon: "👥" },
    { title: "Active Coaches", count: users.filter((user) => user.role === "coach").length, icon: "📈" },
    { title: "Products", count: products.length, icon: "🛍️" },
    { title: "Sessions Today", count: "156", icon: "📅" },
  ]
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm text-gray-600">{card.title}</h4>
            <h2 className="text-2xl font-bold text-black">{card.count}</h2>
          </div>
          <div className="text-3xl text-blue-500">{card.icon}</div>
        </div>
      ))}
    </div>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* Sidebar fixe */}
        <SideBar />

        {/* Contenu dynamique */}
        <div >
          <Outlet />
        </div>
      </div>
  </div>
  )
}

export default AdminDashboard