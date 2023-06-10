import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../slices/cartSlice'


const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart)

    const {cartItems} = cart;

    const addToCartHandler = async (product, quantity) => {
        dispatch(addToCart({...product, quantity}))
    }

    const removeFromCartHandler = async ( id ) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom: '20px'}}>Shopping cart</h1>
            {
                cartItems.length === 0 ? ( <h1>Your cart is empty</h1> ) : ( <ListGroup variant='flush'>
                    { cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>

                                <Col md={3}>
                                    <Link to={ `/product/${item._id}`}>{item.name}</Link>
                                </Col>

                                <Col md={2}>
                                    {item.price} rupees
                                </Col>

                                <Col md={2}> quantity
                                    <Form.Control
                                        as ='select'
                                        value = {item.quantity}
                                        onChange= {(e) => addToCartHandler(item, Number(e.target.value)) }
                                    > 
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}> {x + 1} </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>

                                <Col md={2}>
                                    <Button type="button" variant='light' onClick={ () => removeFromCartHandler(item._id)}> <FaTrash /> </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )) }
                </ListGroup> )
            }
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>
                            Subtotal ( {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                        </h3>

                        { cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} rupees
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={ cartItems.length === 0} onClick={checkOutHandler}>
                            Proceed to checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen