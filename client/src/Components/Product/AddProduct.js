import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../Redux/Actions/ProductActions";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddProduct = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [imageURL,setImageURL]=useState('')
  const [price,setPrice]=useState(0)
  const [category,setCategory]=useState('') 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAdd=(a)=>{
    a.preventDefault()
    dispatch(addProduct({title,description,imageURL,price,category},navigate))
    handleClose()
  }
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Add Product
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
    <Form.Group className="mb-3">
      <Form.Label>Product name</Form.Label>
      <Form.Control type="text" placeholder="Enter titre" onChange={(e)=> setTitle(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" placeholder="Enter Description" onChange={(e)=> setDescription(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Image URL</Form.Label>
      <Form.Control type="text" placeholder="Enter Image URL" onChange={(e)=> setImageURL(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" >
      <Form.Label>Price</Form.Label>
      <Form.Control type="Number" placeholder="Enter Price" onChange={(e)=> setPrice(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Form.Control type="text" placeholder="Enter Category" onChange={(e)=> setCategory(e.target.value)}/>
    </Form.Group>
  </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e)=>handleAdd(e)}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default AddProduct