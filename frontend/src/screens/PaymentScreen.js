import React, { useEffect,useState } from 'react'
import { Row,Col,Image,ListGroup,Button,Card,Form,} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useParams,useLocation, useNavigate, Navigate  } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { addToCart,removeFromCart } from '../actions/cartActions'

import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen(){
    const cart = useSelector(state=> state.cart)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const [paymentMethod,setPaymentMethod] = useState('PayPal')


    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Trigger submit")       
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return(
            <FormContainer>
                <CheckoutSteps step1 step2/>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">
                            Select Method
                        </Form.Label>
                        <Col>
                            <Form.Check type='radio' label='Paypal or Credit Card' id='paypal' name='paymentMethod' checked onChange={(e)=>setPaymentMethod(e.target.value)}>

                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Continue
                    </Button>

                </Form>
            </FormContainer>
    )
}

export default PaymentScreen