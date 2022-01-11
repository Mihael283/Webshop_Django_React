import React, {useState, useEffect} from 'react'
import { Row,Col,Image,ListGroup,Button,Card,Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { id } = useParams()
    

    const [qty,setQty] = useState(1)


    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product} = productDetails

    useEffect(()=>{
        dispatch(listProductDetails(id))
    }, [dispatch])
    
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className= 'btn btn-light my-3'>Go Back</Link>
            {loading  ? (
            <Loader/> ): error ? (<Message variant = "danger">{error}</Message>) : (
                <Row>
                <Col md = {6}>
                    <Image src={product.image} alt = {product.name}/>
                </Col>

                <Col md = {3}>
                    <ListGroup variant= "flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md = {3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? ' In stock ': ' Out of Stock '}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>   
                                    <Col xs = 'auto' className='my-1'> 
                                        <Form.Control as = "select" value = {qty} onChange={(e) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => (
                                                <option key = {x+1} value = {x+1}>
                                                    {x+1}
                                                </option>))/* Mappaj countInStock od producta */

                                            }
                                        
                                        </Form.Control>
                                        </Col>
                                    
                                </Row>
                                </ListGroup.Item>

                            )}
                            <ListGroup.Item>
                                <Button onClick = { addToCartHandler } className='btn-block' disabled={product.countInStock == 0} type='button'>ADD TO CART</Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>

                
            </Row>
            )
            }
            
        </div>
    )
}

export default ProductScreen