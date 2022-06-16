import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Container,Image,Stack,Card} from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { listProducts } from '../actions/productActions'

function HomeTest(){
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { error,loading,products} = productList

    useEffect(()=>{
        dispatch(listProducts())
    }, [dispatch])
    
    console.log("error",error)
    console.log("loading",loading)


    return (
        <div>
                <Row className= "justify-content-center">
                    <Col className="lg-2 d-none d-xl-block"> 
                    <Image style={{ width: '18rem', height: '18rem'}} src="https://i.postimg.cc/Y0NmwGy1/pngaaa-com-677685-1.png" />
                    </Col>
                    <Col className="md-auto justify-content-center">
                        <Col className="text-center" ><h1>MIHAEL SHOP</h1></Col>
                        <br/>
                        <Col className="text-center"><h3>Welcome to best League of Legends account shop!</h3></Col>
                        <br/>
                        <Col className="text-center"><h3>Why choose us:</h3></Col>
                    </Col>
                    <Col className="lg-2 d-xl-flex justify-content-end d-none">
                        <Image style={{ width: '18rem', height: '18rem'}} src="https://i.postimg.cc/Y0NmwGy1/pngaaa-com-677685-1.png" />
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card style={{ width: '18rem' }} className="text-center rounded-1" >
                        <Card.Body>
                            <Card.Title>INSTANT DELIVERY</Card.Title>
                            <Card.Text>
                                Account info will be sent to you immediately after the payment.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col md="auto">
                        <Card style={{ width: '18rem'}} className="text-center rounded-1" >
                        <Card.Body>
                            <Card.Title>RANKED READY</Card.Title>
                            <Card.Text>
                                Every account is fresh and has the best MMR you can get.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col md="auto">
                        <Card style={{ width: '18rem' }} className="text-center rounded-1">
                        <Card.Body>
                            <Card.Title>BEST SUPPORT</Card.Title>
                            <Card.Text>
                                90 Day warranty, no questions asked, 24/7 support.
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
        </div>
    );
}

export default HomeTest