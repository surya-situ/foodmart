import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice';


const OrderScreen = () => {

  const  {id: orderId} = useParams();

  const {data: order, isLoading, isError} = useGetOrderDetailsQuery(orderId)

  console.log(order);

  return (
    <div>OderScreen</div>
  )
}

export default OrderScreen