import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { listProducts } from '../actions/productActions'


function HomeScreen(){
    
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
            <h2>Latest Product</h2>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <h1>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>

                    ))}
                </Row>
                </h1>
            )

            }
        </div>
    );
}

export default HomeScreen