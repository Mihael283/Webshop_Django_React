import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers,deleteUser } from '../actions/userActions'
import { useLocation,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }

    }, [dispatch, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <FontAwesomeIcon icon = {faCheck} style={{ color: 'green' }}></FontAwesomeIcon>
                                        ) : (
                                            <FontAwesomeIcon icon = {faTimes} style={{ color: 'red' }}></FontAwesomeIcon>
                                            )}</td>

                                        <td>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                    <FontAwesomeIcon icon = {faTrash} />
                                            </Button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen