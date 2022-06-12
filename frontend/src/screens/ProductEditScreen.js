import React, { useState, useEffect } from "react";
import axios  from 'axios';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  let { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [rank, setRank] = useState("");
  const [type, setType] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {loading: loadingUpdate,error: errorUpdate,success: successUpdate, } = productUpdate;
    
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/productlist");
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setRank(product.rank);
        setType(product.type);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, id, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id:id, name,price,image,rank,type,countInStock,description}))
  };

  const uploadFileHandler =  async (e) =>{
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image',file)
    formData.append('product_id',id)

    setUploading(true)

    try{
        const config = {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }

        const {data} = await axios.post('/products/upload/', formData, config)
        setImage(data)
        setUploading(false)
    }catch(error){
      setUploading(false)
    }
  }
  return (
    <div>
      <Link to="/productlist">Go back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label> Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label> Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
             
              <Form.Control type='file' label='Choose file' custom='true' onChange={uploadFileHandler}>

              </Form.Control>
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId="rank">
              <Form.Label> Rank</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label> Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label> Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label> Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
