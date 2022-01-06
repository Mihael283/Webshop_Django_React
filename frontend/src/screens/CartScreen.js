import React, { useEffect } from 'react'
import { Row,Col,Image,ListGroup,Button,Card,Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { addToCart } from '../actions/cartActions'

import Loader from '../components/Loader'
import Message from '../components/Message'


function CartScreen(){
    const location = useLocation()
    let {productId} = useParams()
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const dispatch = useDispatch()

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    return (
        <div>
            
        </div>
    )
}

export default CartScreen