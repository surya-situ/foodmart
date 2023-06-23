import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { FaHamburger } from 'react-icons/fa';
import {Button} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import { Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel';
import FeatureSection from '../components/FeatureSection';
import Hero from '../components/Hero'


const HomeScreen = () => {

    const {data: products, isLoading, error} = useGetProductsQuery();

    return (
        <>
            {/* <ProductCarousel /> */}
            <Hero />
            { isLoading ? ( <h2>Loading</h2> ) : error ? ( <div>{ error?.data?.message || error.error }</div> ) : (
                <>
                    {/* <Hero /> */}
                    <Col>
                        <h1>Popular items</h1>
                        <Link to='/menu' style={{ textDecoration: 'none' }}>
                            <Button bg='dark' rounded='true'><FaHamburger /> See all items</Button>
                        </Link>
                    </Col>
                    <Row>
                        {
                            products.slice(0, 4).map( (product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                </>
            )}
            <FeatureSection /> 
        </>
    )
}

export default HomeScreen