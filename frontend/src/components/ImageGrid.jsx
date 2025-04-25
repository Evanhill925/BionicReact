import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';

export default function ImageGrid({ images, gridClass }) {
  const { theme } = useTheme();
  
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <Container className="text-center my-5">
        <p>No images to display.</p>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: '1000px' }}>
      <Row xs={1} sm={2} md={3} className={`g-4 ${gridClass || ''}`}>
        {images.map((image) => (
          <Col key={image.id}>
            <Card 
              className={`h-100 shadow-sm ${theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}`}
            >
              <a 
                href={`/?image=${image.image_message_id}`} 
                className="text-decoration-none"
              >
                <Card.Img
                  variant="top"
                  src={image.image_url}
                  alt={image.prompt || "Generated image"}
                  title={image.prompt}
                  style={{
                    objectFit: "contain",
                    height: "auto",
                    aspectRatio: "1/1",
                    backgroundColor: theme === 'dark' ? "#1a1a1a" : "#f8f9fa",
                  }}
                />
                {image.prompt && (
                  <Card.Body className={theme === 'dark' ? 'text-light' : 'text-dark'}>
                    <Card.Text className="small text-truncate">
                      {image.prompt}
                    </Card.Text>
                  </Card.Body>
                )}
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}