import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { listProducts } from '../actions/productActions'


function HomeScreenv2(){
    
    return (
        <div>
            <Container>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                    <Col>3 of 3</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomeScreenv2