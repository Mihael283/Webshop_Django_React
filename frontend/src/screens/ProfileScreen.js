import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'


import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'

import { Row,Col,Button,Form,Table } from 'react-bootstrap'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

import { listMyOrders } from '../actions/orderActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

function ProfileScreen({}){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error,loading,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders,orders } = orderListMy

    useEffect(() =>{
        if(!userInfo){
            navigate('/login')
        }
        else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[navigate,userInfo,dispatch,user,success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password,

            }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h>User Profile</h>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit = {submitHandler}>

                    <Form.Group controlId = 'name'>
                        <Form.Label> Name </Form.Label>
                        <Form.Control required type = 'name' placeholder = 'Enter Name' value= {name} onChange={(e)=> setName(e.target.value)}>
                        </Form.Control>           
                    </Form.Group>

                    <Form.Group controlId = 'email'>
                        <Form.Label> Email Adress </Form.Label>
                        <Form.Control required type = 'email' placeholder = 'Enter Email' value= {email} onChange={(e)=> setEmail(e.target.value)}>
                        </Form.Control>           
                    </Form.Group>


                    <Form.Group controlId = 'password'>
                        <Form.Label> Password </Form.Label>
                        <Form.Control type = 'password' placeholder = 'Enter Password' value= {password} onChange={(e)=> setPassword(e.target.value)}>
                        </Form.Control>           
                    </Form.Group>

                    <Form.Group controlId = 'passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type = 'password' placeholder = 'Confirm Password' value= {confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}>
                        </Form.Control>           
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h>My Orders</h>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Details</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <FontAwesomeIcon icon = {faTimes} style={{ color: 'red' }}></FontAwesomeIcon>
                                            )}</td>
                                            <td>
                                                <Link to={`/orders/${order.id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

export default ProfileScreen