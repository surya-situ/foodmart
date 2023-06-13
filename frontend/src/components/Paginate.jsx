import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Paginate = () => {
    const { pageNumber } = useParams();
    const navigate = useNavigate();
  
    // Example values for total number of pages and active page
    const pages = 2;
    const activePage = parseInt(pageNumber, 2) || 1;
  
    const handlePageChange = (page) => {
      navigate(`/menu/page/${page}`);
    };
  
    return (
      <div>
        {/* Rest of the menu screen content */}
        
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={`/menu/page/${x + 1}`}
              onClick={() => handlePageChange(x + 1)}
            >
              <Pagination.Item active={x + 1 === activePage}>
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </div>
    );
  };
  
  export default Paginate;