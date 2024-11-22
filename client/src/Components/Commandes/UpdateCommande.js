import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneOrder, updateOrder } from '../../Redux/Actions/OrderActions';

const UpdateCommande = () => {
    const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
      dispatch(getOneOrder(id))
  },[])

  const order = useSelector(state=>state.orderReducer.order)

  const [product,setProduct]= useState(order.product)
  const [quantity,setQuantity]= useState(order.quantity)
  const [price,setPrice]= useState(order.price)

  useEffect(()=>{
        setProduct(order.product)
        setQuantity(order.quantity)
          setPrice(order.price)
  },[order])

  const handleUpdate=(a)=>{
      a.preventDefault()
      dispatch(updateOrder(id,{product,quantity,price}, navigate))
  }
  return (
    
      <Form>
    <Form.Group className="mb-3">
      <Form.Label>Product name</Form.Label>
      <Form.Control value={product} type="text" placeholder="Enter titre" onChange={(e)=> setProduct(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>quantity</Form.Label>
      <Form.Control value={quantity} type="text" placeholder="Enter Description" onChange={(e)=> setQuantity(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Price</Form.Label>
      <Form.Control value={price} type="Number" placeholder="Enter Price" onChange={(e)=> setPrice(e.target.value)}/>
      </Form.Group>

      <Button onClick={(e)=>handleUpdate(e)} variant="primary" type="submit">
        update
      </Button>
  </Form>
     
  )
}

export default UpdateCommande