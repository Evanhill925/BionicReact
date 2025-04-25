import React, { useRef } from 'react';
import { Form, Button, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';

export default function SearchForm({ originals, onFilterChange, formText = "Search by prompt:" }) {
  const galleryRef = useRef();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = galleryRef.current.value;

    // Filter images based on input value
    const filterImages = originals.filter((image) =>
      image.prompt && image.prompt.includes(inputValue)
    );

    onFilterChange(filterImages);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit} id="gallery-form">
            <Form.Group controlId="gallerySearch">
              <Form.Label className="fw-bold mb-2">{formText}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter search terms..."
                  ref={galleryRef}
                  className={theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}
                />
                <Button 
                  type="submit" 
                  variant={theme === 'dark' ? 'light' : 'dark'}
                  className="fw-bold px-4"
                >
                  Search
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}