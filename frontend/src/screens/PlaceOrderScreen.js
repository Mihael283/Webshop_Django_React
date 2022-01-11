import React, { useEffect,useState } from 'react'
import { Row,Col,Image,ListGroup,Button,Card,Form,} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useParams,useLocation, useNavigate, Navigate  } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { addToCart,removeFromCart } from '../actions/cartActions'

import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { savePaymentMethod } from '../actions/cartActions'
import {ORDER_CREATE_RESET} from '../constants/orderConstants'

function PlaceOrderScreen(){

    const orderCreate= useSelector(state => state.orderCreate)
    const {order,error,success} = orderCreate

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin



    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.taxPrice = Number((cart.itemsPrice * 0.25)).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(2)

    if(!cart.paymentMethod){
        navigate("/payment/")
    }

    useEffect(()=>{
        if(success){
            navigate(`/order/${order.id}`)
            dispatch({type: ORDER_CREATE_RESET})

        }
    },[success,navigate])

    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
    return(
        <div>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8} >
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                            <h2>Shipping</h2>
                        <p>
                            <strong>Ship to: </strong>
                            {userInfo.email}
                        </p>
                       </ListGroup.Item>
                   </ListGroup>

                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                            <h2>Payment method</h2>
                        <p>
                            <strong>Method : </strong>
                            {cart.paymentMethod}
                        </p>
                       </ListGroup.Item>
                   </ListGroup>

                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                            <h2>Order Items</h2>
                        { cart.cartItems.lenght===0?<Message variant='info'>Your cart is empty</Message> : (<ListGroup variant="flush">
                            {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key = {index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>

                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                        </ListGroup>)}
                       </ListGroup.Item>
                   </ListGroup>
                </Col>
                    
                <Col md={4}>
                <Card>
                        <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Item:</Col>
                                        <Col>${cart.itemsPrice}</Col>                                     
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${cart.taxPrice}</Col>                                     
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${cart.totalPrice}</Col>                                     
                                    </Row>
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button type="button" className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrder}>Place Order</Button>
                                </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen