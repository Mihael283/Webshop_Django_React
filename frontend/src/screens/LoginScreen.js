import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'


import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'

import { Row,Col,Button,Form } from 'react-bootstrap'
import { login } from '../actions/userActions'




function LoginScreen({}){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error,loading,userInfo} = userLogin

    useEffect(() =>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>Email or password doesn't match</Message> }
            {loading && <Loader /> }
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId = 'email'>
                    <Form.Label> Email Adress </Form.Label>
                    <Form.Control type = 'email' placeholder = 'Enter Email' value= {email} onChange={(e)=> setEmail(e.target.value)}>
                    </Form.Control>           
                </Form.Group>


                <Form.Group controlId = 'password'>
                    <Form.Label> Password </Form.Label>
                    <Form.Control type = 'password' placeholder = 'Enter Password' value= {password} onChange={(e)=> setPassword(e.target.value)}>
                    </Form.Control>           
                </Form.Group>
                
                <Form.Group>
                    <br></br>
                    <Button type='submit' variant='outline-dark'>Sign In</Button>
                </Form.Group>
                
            </Form>

            <Row className = 'py-3'>
                <Col>
                    New Customer? <Link to ={redirect ? `/register?redirect=${redirect}` : '/register'}> Register </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen