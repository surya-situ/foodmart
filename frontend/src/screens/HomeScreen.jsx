import React from 'react'
// import React,{useEffect, useState} from 'react'
// import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import Hero from '../components/Hero';

const HomeScreen = () => {

    // const[products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data);
    //     }

    //     fetchProducts();
    // }, [])

    const {data: products, isLoading, error} = useGetProductsQuery();

    return (
        <>

            { isLoading ? ( <h2>Loading</h2> ) : error ? ( <div>{ error?.data?.message || error.error }</div> ) : (
                <>
                    <Hero />
                    <h1>Popular Products</h1>
                    <Row>
                        {
                            products.map( (product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                </>
            )}
            
        </>
    )
}

export default HomeScreen