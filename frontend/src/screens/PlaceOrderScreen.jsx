import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';


const PlaceOrderScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
          navigate('/shipping');
        } else if (!cart.paymentMethod) {
          navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch()
    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
        } catch (error) {
            toast.error(error.message);
            // console.log(error);
        }
    };

    // console.log(createOrder);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address} , {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                                {item.name}
                                            </Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.quantity} x {item.price} ₹ = {item.quantity * item.price} ₹
                                            </Col>
                                        </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                
                <Col md={4}>
                    <Card>

                        <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                            <Col>Items</Col>
                            <Col>{cart.itemsPrice} ₹</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                            <Col>
                                Shipping:  {' '}
                                <span style={{ 
                                    backgroundColor: cart.itemsPrice > 300 ? 'rgb(50, 168, 82)' : 'inherit', 
                                    color: cart.itemsPrice > 300 ? 'white' : 'inherit', 
                                    fontWeight: cart.itemsPrice > 300 ? 'bold' : 'normal',
                                    borderRadius: '4px',
                                    padding: '0 10px', // Padding in the x-axis only
                                }}>
                                    {cart.itemsPrice >= 300 ? 'free' : ''}
                                </span>
                            </Col>
                            <Col>{cart.shippingPrice} ₹</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                            <Col>Tax</Col>
                            <Col>{cart.taxPrice} ₹</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                            <Col>Total</Col>
                            <Col>{cart.totalPrice} ₹</Col>
                            </Row>
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                        {error && <Message variant='danger'>{error.toString()}</Message>}
                        </ListGroup.Item> */}

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            >
                            Place Order
                            </Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                        
                        </ListGroup>
                    </Card>
                </Col>


            </Row>
        </>
    )
}

export default PlaceOrderScreen
