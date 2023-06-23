import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import ProductCarousel from '../components/ProductCarousel';


const HomeScreen = () => {


    const {data: products, isLoading, error} = useGetProductsQuery();


    return (
        <>
            <ProductCarousel />
            { isLoading ? ( <h2>Loading</h2> ) : error ? ( <div>{ error?.data?.message || error.error }</div> ) : (
                <>
                    
                    <h3>All Items</h3>
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