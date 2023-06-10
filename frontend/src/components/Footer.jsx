
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// const Footer = () => {
//   return (
//     <footer className="footer bg-dark text-light py-4">
//       <Container className="d-flex flex-column justify-content-around align-items-center ">
//         <Row className='d-flex flex-row justify-content-around'>
//           <Col md={4} className="footer-section mb-1">
//             <h5 className="text-light">Address</h5>
//             <p>123 Main Street</p>
//             <p>Bhubaneswar, Odisha 7520100</p>
//           </Col>
//           <Col md={4} className="footer-section mb-1">
//             <h5 className="text-light">Contact</h5>
//             <p>Email: foodmart@gmail.com</p>
//             <p>Phone: (0674) 4563-7890</p>
//           </Col>
//           <Col md={4} className="footer-section mb-1">
//             <h5 className="text-light">Follow Us</h5>
//             <p>Facebook</p>
//             <p>Instagram</p>
//           </Col>
//         </Row>
//         <hr className="text-light" />
//         <p className="text-light mb-0">&copy; {new Date().getFullYear()} Foodmart. All rights reserved.</p>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container className="d-flex flex-column justify-content-around align-items-center ">
        <Row className="d-flex flex-row justify-content-around">
          <Col md={4} className="footer-section mb-1 my-2">
            <h5 className="text-light">Address</h5>
            <p>kalpana Square</p>
            <p>Bhubaneswar, Odisha 7520100</p>
          </Col>
          <Col md={4} className="footer-section mb-1 my-2">
            <h5 className="text-light">Contact</h5>
            <p>Email: foodmart@gmail.com</p>
            <p>Phone: (0674) 4563-7890</p>
          </Col>
          <Col md={4} className="footer-section mb-1 my-2">
            <h5 className="text-light">Follow Us</h5>
            <p>Facebook</p>
            <p>Instagram</p>
          </Col>
        </Row>
        <hr className="text-light" />
        <p className="text-light mb-0">&copy; {new Date().getFullYear()} Foodmart. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;