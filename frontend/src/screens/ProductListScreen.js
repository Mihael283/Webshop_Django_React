import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts,deleteProduct,createProduct} from '../actions/productActions'
import { useLocation,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { PRODUCT_CREATE_RESET} from '../constants/productConstants'
import { cartReducer } from '../reducers/cartReducers'
function ProductListScreen() {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/products/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }

    }, [dispatch, userInfo , successDelete, createdProduct])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <FontAwesomeIcon icon = {faPlus} style={{ color: 'green' }}></FontAwesomeIcon>
                    </Button>
                </Col>
            </Row>

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>RANK</th>
                                        <th>TYPE</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.rank}</td>
                                            <td>{product.type}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <FontAwesomeIcon icon = {faEdit} style={{ color: 'green' }}></FontAwesomeIcon>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <FontAwesomeIcon icon = {faTrash} style={{ color: 'green' }}></FontAwesomeIcon>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen