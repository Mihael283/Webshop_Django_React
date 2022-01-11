import React, { useEffect } from 'react'
import { Row,Col,Image,ListGroup,Button,Card,Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { addToCart,removeFromCart } from '../actions/cartActions'

import Loader from '../components/Loader'
import Message from '../components/Message'


function CartScreen(){
    const location = useLocation()
    const navigate = useNavigate()
    const productId = location.pathname.split("/")[2]
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {

        if(userInfoFromStorage != null){
            navigate('/payment')
        }
        else{
            navigate('/login')
        }

    }

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    return (
        <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {

                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }

                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                X
                                            </Button>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>

            </Card>
        </Col>
    </Row>
    )
}

export default CartScreen