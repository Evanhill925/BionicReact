import { useState, useEffect } from "react";
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useTheme } from "../ThemeContext";
import NavBar from "../components/NavBar";
import ImageGrid from "../components/ImageGrid";
import Homepage from "../components/Homepage";
import HelmetComponent from "../HeaderComponent";

export function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singleImage, setSingleImage] = useState({});
  const { theme } = useTheme();
  
  const uriPath = import.meta.env.VITE_uriPath;

  // Fetch recent images for the gallery section
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch 6 images to display in 2 rows of 3
        const res = await fetch(`${uriPath}/userImages/6`);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [uriPath]);

  // Handle image from URL or fetch random image
  useEffect(() => {
    // Function to parse query parameters from the URL
    const getQueryParameters = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams;
    };

    // Get the image_message_id from the URL
    const urlParams = getQueryParameters();
    const imageMessageId = urlParams.get("image");

    const fetchImage = async (id) => {
      try {
        const res = await fetch(`${uriPath}/image/${id}`);
        const data = await res.json();
        setSingleImage(data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (imageMessageId) {
      // If image_message_id exists in the URL, fetch and set it
      fetchImage(imageMessageId);
    } else {
      // If image_message_id doesn't exist in the URL, fetch a random image
      const fetchRandomImage = async () => {
        try {
          const res = await fetch(`${uriPath}/userImages/50`);
          const data = await res.json();
          const randomIndex = Math.floor(Math.random() * Math.min(50, data.length));
          const randomImage = data[randomIndex];
          setSingleImage(randomImage);

          // Update the URL after setting the random image
          window.history.pushState(
            null,
            "",
            `?image=${randomImage.image_message_id}`
          );
        } catch (error) {
          console.error("Error fetching random image:", error);
        }
      };
      fetchRandomImage();
    }
  }, [uriPath]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <NavBar state={singleImage} />
      <Homepage defaultImage={singleImage} />

      <Container className="my-5 pb-5" style={{ maxWidth: '1000px' }}>
        <h2 className={`text-center border-bottom pb-2 mb-4 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
          Previously Created Images
        </h2>
        {images.length > 0 ? (
          <ImageGrid images={images} />
        ) : (
          <Alert variant={theme === 'dark' ? 'dark' : 'light'} className="text-center">
            No previous images found.
          </Alert>
        )}
      </Container>

      {/* <HelmetComponent imageDict={singleImage} /> */}
    </>
  );
}
