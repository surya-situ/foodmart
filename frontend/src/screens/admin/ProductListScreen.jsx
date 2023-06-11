import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Toast } from 'react-bootstrap'
import { FaTrash, FaEdit } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productApiSlice'

const ProductListScreen = () => {

  const {data: products, isLoading, error, refetch} = useGetProductsQuery()

  const [createProduct, {isLoading:  loadingCreate}] = useCreateProductMutation()

  const deleteHandler = (id) => {
    console.log('delete', id);
  }

  const createProductHandler = async () => {
    if(window.confirm('New product will created')) {
      try{
        await createProduct();
        refetch()
      } catch(error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <Row className='align-items-center'> 
        <Col>
          <h2>Products</h2>
        </Col>

        <Col className='text-end'>
          <Button className='btn-sm sm-3' onClick={createProductHandler}>
            <FaEdit></FaEdit> Create product
          </Button>
        </Col>
      </Row>


      { loadingCreate && <Loader /> }
      {
        isLoading ? <Loader />  : error ? <Message variant='danger'>{error}</Message> : (

          <>
            <Table stripped='true' hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>Brand</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{ product._id }</td>
                    <td>{ product.name }</td>
                    <td>{ product.price }</td>
                    <td>{ product.category }</td>
                    <td>{ product.brand }</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button variant='danger' className='btn-sm' onClick={ () => deleteHandler(product._id) } >
                        <FaTrash style={{color: 'white'}}></FaTrash>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>

        )
      }
    </>
  )
}

export default ProductListScreen