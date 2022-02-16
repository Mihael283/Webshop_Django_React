import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts} from '../actions/productActions'
import { useLocation,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

function ProductListScreen() {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }

    }, [dispatch, userInfo])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            //delete
        }
    }

    const createProductHandler = (product) =>{
        //smth
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
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

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