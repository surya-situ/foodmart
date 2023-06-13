import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { FaHamburger } from 'react-icons/fa';
import {Button} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import { Link } from 'react-router-dom'


const SuggestProductScreen = () => {

    const {data: products, isLoading, error} = useGetProductsQuery();

    return (
        <>

            { isLoading ? ( <h2>Loading</h2> ) : error ? ( <div>{ error?.data?.message || error.error }</div> ) : (
                <>
                    {/* <Hero /> */}
                    <Col>
                        <h4>Want to have some more</h4>
                        <Link to='/menu' style={{ textDecoration: 'none' }}>
                            <Button bg='light' rounded='true'><FaHamburger /> See all items</Button>
                        </Link>
                    </Col>
                    <Row>
                        {/* {
                            products.slice(4, 0).map( (product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                        } */}
                        {
                            products.slice(Math.floor(products.length / 2) - 2, Math.floor(products.length / 2) + 2).map((product) => (
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

export default SuggestProductScreen

