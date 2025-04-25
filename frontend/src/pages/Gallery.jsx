import { useState, useEffect } from "react";
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useTheme } from "../ThemeContext";
import NavBar from "../components/NavBar";
import ImageGrid from "../components/ImageGrid";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";

export function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originals, setOriginals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(20);
  const { theme } = useTheme();
  
  const uriPath = import.meta.env.VITE_uriPath;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${uriPath}/userImages/300`);
        const data = await res.json();
        setImages(data);
        setOriginals(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [uriPath]);

  const handleFilterChange = (filteredResults) => {
    setImages(filteredResults);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Calculate pagination indices
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Handle pagination change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <NavBar />
      
      <Container className={`py-4 ${theme === 'dark' ? 'text-light' : 'text-dark'}`} style={{ maxWidth: '1000px' }}>
        <h1 className="text-center mb-4">Image Gallery</h1>
        
        <SearchForm
          originals={originals}
          onFilterChange={handleFilterChange}
          formText="Search the Gallery!"
        />

        {images.length === 0 ? (
          <Alert variant={theme === 'dark' ? 'dark' : 'light'} className="text-center my-5">
            <Alert.Heading>No images found</Alert.Heading>
            <p>Try a different search term or browse all images by clearing your search.</p>
          </Alert>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-end mb-0">
                Showing {indexOfFirstImage + 1}-{Math.min(indexOfLastImage, images.length)} of {images.length} images
              </p>
            </div>
            
            <ImageGrid 
              images={currentImages} 
              gridClass="gallery-grid" 
            />
            
            <Pagination
              imagesPerPage={imagesPerPage}
              totalImages={images.length}
              paginate={paginate}
            />
          </>
        )}
      </Container>
    </>
  );
}
