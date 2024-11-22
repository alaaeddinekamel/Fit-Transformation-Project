import React, { useEffect, useState } from 'react'
import { getOneProduct, updateProduct } from '../../Redux/Actions/ProductActions'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProduct = ({product}) => {
    const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title,setTitle]= useState(product.title)
  const [description,setDescription]= useState(product.description)
  const [imageURL,setImageURL]= useState(product.imageURL)
  const [price,setPrice]= useState(product.price)
  const [category,setCategory]=useState(product.category) 

  useEffect(()=>{
          setTitle(product.title)
          setDescription(product.description)
          setImageURL(product.imageURL)
          setPrice(product.price)
          setCategory(product.category)
  },[product])

  const handleUpdate=(a)=>{
      a.preventDefault()
      dispatch(updateProduct(product._id,{title,description,imageURL,price,category}))
      handleClose()
  }
  return (
    <>
    <i class="fa-solid fa-user-pen" onClick={handleShow}></i>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
    <Form.Group className="mb-3">
      <Form.Label>Product name</Form.Label>
      <Form.Control value={title} type="text" placeholder="Enter titre" onChange={(e)=> setTitle(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Description</Form.Label>
      <Form.Control value={description} type="text" placeholder="Enter Description" onChange={(e)=> setDescription(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Image URL</Form.Label>
      <Form.Control value={imageURL} type="text" placeholder="Enter Image URL" onChange={(e)=> setImageURL(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Price</Form.Label>
      <Form.Control value={price} type="Number" placeholder="Enter Price" onChange={(e)=> setPrice(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Form.Control value={category} type="text" placeholder="Enter Category" onChange={(e)=> setCategory(e.target.value)}/>
    </Form.Group>
  </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e)=>handleUpdate(e)}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default UpdateProduct