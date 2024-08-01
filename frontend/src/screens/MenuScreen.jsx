import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { data: products, isLoading, error } = useGetProductsQuery();

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory)
    ;

    const getCategoryTitle = () => {
        switch (selectedCategory) {
            case 'veg':
                return 'Vegetarian Items';
            case 'nonveg':
                return 'Non-Vegetarian Items';
            default:
                return 'All Food Items';
        }
    };

    return (
        <>
            <ProductCarousel />
            <Form.Group controlId="categorySelect" className="my-3" style={{ maxWidth: '300px' }}>
                <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Lato , sans-serif' }}>Select Category</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="all">All</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                </Form.Control>
            </Form.Group>
            {isLoading ? (
                <h2>Loading</h2>
            ) : error ? (
                <div>{error?.data?.message || error.error}</div>
            ) : (
                <>
                    <h3>{getCategoryTitle()}</h3>
                    <Row>
                        {filteredProducts.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomeScreen;
