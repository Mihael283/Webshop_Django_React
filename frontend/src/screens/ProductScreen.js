import React, {useState, useEffect} from 'react'
import { Row,Col,Image,ListGroup,Button,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'



function ProductScreen(){
    let { id } = useParams();


    const [product,setProduct] = useState([])


    useEffect(()=>{
        async function fetchProduct(){
            const {data} = await axios.get(`/products/${id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [])
    
    return (
        <div>
            <Link to="/" className= 'btn btn-light my-3'>Go Back</Link>
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

                            <ListGroup.Item>
                                <Button className='btn-block' disabled={product.countInStock == 0} type='button'>ADD TO CART</Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>

                
            </Row>
        </div>
    )
}

export default ProductScreen