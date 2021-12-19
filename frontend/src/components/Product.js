import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Product({product}) {
    return (
        <Card className= "my-3 py-3 rounded">
            <Link to ={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </Link>

            <Card.Body>
                <Link to ={`/product/${product._id}`}>
                    <Card.Title as = "div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as= "div">
                    <div className="my-3">
                        <p>INFO FOR LATER</p>
                    </div>
                </Card.Text>

                <Card.Text as= "div">
                    <div className="my-3">
                        ${product.price}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product