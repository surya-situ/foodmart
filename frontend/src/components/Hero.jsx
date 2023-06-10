import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <Card className="bg-dark text-white">
      <Card.Img src="" alt="Hero Image" />
      <Card.ImgOverlay>
        <Container>
          <h1>Welcome to Delicious Restaurant</h1>
          <p>Experience the finest culinary delights in a cozy ambiance.</p>
          <Button variant="primary">View Menu</Button>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Hero;



