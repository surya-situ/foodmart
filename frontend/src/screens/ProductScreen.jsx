import React,{useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { addToCart } from '../slices/cartSlice';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating';

const ProductScreen = () => {

    const { id: productId } = useParams();
    // const product = products.find((p) => p._id === productData)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [ quantity, setQuantity] = useState(1);

    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch( addToCart({ ...product , quantity}))
        navigate('/cart');
    }
    
    return (
        
        <>
            <Link className='btn btn-light my-3' to='/'>Go back</Link>

            { isLoading ? ( <h2>Loading</h2> ) : error ? ( <div>{error?.data?.message}</div> ) : (
                <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name}  fluid />
                </Col>

                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}                         
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>    
                                    <Col>
                                        <strong>{product.price} rupees</strong>
                                    </Col>
                                </Row>                            
                        </ListGroup.Item>



                        <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>    
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                    </Col>
                                </Row>                            
                        </ListGroup.Item>

                        {
                            product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                            <Form.Control
                                                as ='select'
                                                value = {quantity}
                                                onChange= {(e) => setQuantity(Number(e.target.value))}
                                            > 
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}> {x + 1} </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        }
                        

                        <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                    Add to cart
                                </Button>                            
                        </ListGroup.Item>

                    </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
            
        </>
    )
}

export default ProductScreen