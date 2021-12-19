import React, {useState, useEffect} from 'react'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen(){
    const [products,setProducts] = useState([])


    useEffect(()=>{
        async function fetchProducts(){
            const {data} = await axios.get('http://127.0.0.1:8000/products/')
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>
                <Row>
                    {products.map(product =>(
                        <Col key={product._id} sm = {12} md = {6} lg = {4} xl= {3}> 
                            <Product product = {product}/>
                        </Col>
                    ))}
                </Row>
            </h1>

        </div>
    )
}

export default HomeScreen