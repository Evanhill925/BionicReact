// import React, { useState, useEffect, useRef } from 'react';
// import { Container, Row, Col, Form, Button, Card, Spinner, ButtonGroup } from 'react-bootstrap';
// import { useTheme } from '../ThemeContext';
// import loadingPic from '../loader.svg';

// function Homepage({ defaultImage }) {
//   const [prompt, setPrompt] = useState('');
//   const [imageURL, setImageURL] = useState('');
//   const [imageID, setImageID] = useState('');
//   const [imagePrompt, setImagePrompt] = useState('');
//   const [imageType, setImageType] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const { theme } = useTheme();
//   const [error, setError] = useState(null);
  
//   const uriPath = import.meta.env.VITE_uriPath;

//   // Check if GPT Image is selected
//   const isGptImageSelected = selectedOption === 'gpt-image-1';
  
//   useEffect(() => {
//     // Set initial state from defaultImage prop only if we don't have an image already
//     // and we don't have an uploaded image
//     if (defaultImage && !imageURL && !uploadedImage) {
//       setImageURL(defaultImage.image_url);
//       setImageID(defaultImage.image_message_id);
//       setImageType(defaultImage.type);
//     }
    
//     // If we have an uploaded image, clear any default or previously generated image
//     if (uploadedImage) {
//       setImageURL('');
//     }
//   }, [defaultImage, imageURL, uploadedImage]);



  
//   const handlePromptChange = (e) => {
//     setPrompt(e.target.value);
//   };

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
    
//     // Clear uploaded image if switching away from GPT Image
//     if (option !== 'gpt-image-1' && uploadedImage) {
//       setUploadedImage(null);
//     }
//   };

//   // Handle file uploads
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setUploadedImage(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Function to trigger file input click
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//     // Set loading to false to ensure any previous loading state is cleared
//     setLoading(false);
//   };

//   const handleFetchImage = async () => {
//     if (loading || (!prompt.trim() && !uploadedImage)) return;
    
//     setLoading(true);
//     setError(null);
//     console.time('ImageCreatedTimer');
    
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userInput: prompt,
//           model: selectedOption ? selectedOption : ' --v 6.1',
//           // Only include image data if GPT Image is selected and an image is uploaded
//           ...(isGptImageSelected && uploadedImage && { imageData: uploadedImage })
//         }),
//       };

//       const res = await fetch(`${uriPath}/Prompt`, requestOptions);
//       const data = await res.json();

//       // Always log the response to help with debugging
//       console.log("API response:", data);
      
//       // Update all state variables in a single batch
//       // This ensures React processes the state changes correctly
//       setImageID(data.image_message_id);
//       setImageURL(data.image_url);
//       setImagePrompt(data.prompt);
//       setImageType(data.type);
//       setUploadedImage(null); // Clear uploaded image after setting the new URL
//       window.history.pushState(null, '', `?image=${data.image_message_id}`);
      
//       // Log to confirm the URL was set properly
//       console.log("Set imageURL to:", data.image_url);
//     } catch (error) {
//       console.error('Error fetching image:', error);
//     } finally {
//        // We've already cleared uploadedImage before setting the new imageURL
//       setPrompt('');
//       setLoading(false);
//       console.timeEnd('ImageCreatedTimer');
//     }
//   };

//   const handlePressButton = async (row, column) => {
//     if (loading) return;
    
//     setLoading(true);
//     console.time('ImageCreatedTimer');
    
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           prompt: imagePrompt,
//           channel_id: '1103168663617556571',
//           message_id: imageID,
//           row_: row,
//           columns_: column,
//         }),
//       };

//       const res = await fetch(`${uriPath}/Button`, requestOptions);
//       const data = await res.json();
      
//       setImageID(data.image_message_id);
//       setImageURL(data.image_url);
//       setImageType(data.type);
//     } catch (error) {
//       console.error('Error fetching image:', error);
//     } finally {
//       setLoading(false);
//       // Clear uploaded image
//       setUploadedImage(null);
//       console.timeEnd('ImageCreatedTimer');
//     }
//   };

//   // Button configurations
//   const buttonLabels = ['U1', 'U2', 'U3', 'U4', '↻', 'V1', 'V2', 'V3', 'V4'];

//   return (
//     <Container className={`py-4 ${theme === 'dark' ? 'text-light' : 'text-dark'}`} style={{ maxWidth: '1000px' }}>
//       <Row className="justify-content-center mb-4">
//         <Col md={10} lg={8}>
//           <h1 className="text-center mb-4">Enter a prompt to create an image</h1>
          
//           {/* Hidden file input for image upload */}
//           <input 
//             type="file" 
//             ref={fileInputRef}
//             onChange={handleFileUpload}
//             accept="image/*"
//             style={{ display: 'none' }}
//           />
          
//           {/* Prompt input, camera icon (conditionally), and submit button */}
//           <Form onSubmit={(e) => { e.preventDefault(); handleFetchImage(); }}>
//             <Form.Group className="mb-3">
//               <Form.Label visuallyHidden>Image Prompt</Form.Label>
//               <div className="d-flex gap-2">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter a prompt"
//                   value={prompt}
//                   onChange={handlePromptChange}
//                   className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
//                 />
                
//                 {/* Camera icon button - only show when GPT Image is selected */}
//                 {isGptImageSelected && (
//                   <Button 
//                     onClick={triggerFileInput}
//                     variant={theme === 'dark' ? 'light' : 'dark'}
//                     className="px-3"
//                     title="Upload an image"
//                   >
//                     <span style={{ fontSize: '1.2rem' }}>📷</span>
//                   </Button>
//                 )}
                
//                 <Button 
//                   onClick={handleFetchImage}
//                   variant={theme === 'dark' ? 'light' : 'dark'}
//                   className="px-4 fw-bold"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <Spinner 
//                       as="span" 
//                       animation="border" 
//                       size="sm" 
//                       role="status" 
//                       aria-hidden="true" 
//                     />
//                   ) : 'Generate'}
//                 </Button>
//               </div>
//             </Form.Group>
//           </Form>
          
//           {/* Dropdown for model selection */}
//           <div className="d-flex justify-content-center mb-4">
//             <Form.Select 
//               onChange={(e) => handleOptionSelect(e.target.value)}
//               style={{ maxWidth: '300px' }}
//               className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
//               value={selectedOption}
//             >
//               <option value="">Midjourney (recommended)</option>
//               <option value="gpt-image-1">GPT Image</option>
//               <option value=" --niji 6">niji </option>
//               <option value="Dalle 3">Dalle 3</option> 
//             </Form.Select>
//           </div>
          
//           {/* Show a note about image upload when GPT Image is selected */}
//         </Col>
//       </Row>

//       {/* Loading indicator or image display */}
//       {loading ? (
//         <div className="d-flex justify-content-center my-5">
//           <img src={loadingPic} alt="Loading" className="img-fluid" style={{ maxHeight: '100px' }} />
//         </div>
//       ) : (
//         (imageURL || uploadedImage || (defaultImage && defaultImage.image_url)) && (
//           <Card
//             className={`border-0 mb-5 mx-auto ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}
//             style={{ maxWidth: '800px' }}
//           >
//             {/* Image prompt title or uploaded image indicator */}
//             <Card.Header className={`text-center border-0 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
//               {uploadedImage && !imageURL ? (
//                 <h4>Uploaded Image</h4>
//               ) : (
//                 <h4>{imagePrompt || (defaultImage && defaultImage.prompt)}</h4>
//               )}
//             </Card.Header>
            
//             {/* Image display - shows either uploaded image or generated image */}
//             <Card.Body className="p-0 d-flex justify-content-center">
//               {uploadedImage ? (
//                 /* Show uploaded image */
//                 <Card.Img
//                   src={uploadedImage}
//                   alt="Uploaded image"
//                   className="img-fluid rounded shadow"
//                   style={{ maxHeight: '80vh' }}
//                 />
//               ) : imageURL ? (
//                 /* Show generated/API image */
//                 <a href={imageURL} target="_blank" rel="noopener noreferrer">
//                   <Card.Img
//                     key={Date.now() + imageURL} /* Add timestamp to key to force re-render */
//                     src={imageURL}
//                     alt="Generated image"
//                     className="img-fluid rounded shadow"
//                     style={{ maxHeight: '80vh' }}
//                   />
//                 </a>
//               ) : defaultImage && defaultImage.image_url ? (
//                 /* Show default image as fallback */
//                 <a href={defaultImage.image_url} target="_blank" rel="noopener noreferrer">
//                   <Card.Img
//                     src={defaultImage.image_url}
//                     alt="Default image"
//                     className="img-fluid rounded shadow"
//                     style={{ maxHeight: '80vh' }}
//                   />
//                 </a>
//               ) : null}
//             </Card.Body>
            
//             {/* Action buttons - only show for generated images with valid type */}
//             {![null, "Upscale"].includes(imageType) && imageURL && (
//               <Card.Footer className={`border-0 text-center py-3 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
//                 <ButtonGroup className="flex-wrap">
//                   {buttonLabels.map((label) => {
//                     const isU = label.startsWith("U");
//                     const isV = label.startsWith("V");
//                     const index = label === "↻" ? 4 : parseInt(label[1], 10) - 1;
                    
//                     return (
//                       <Button
//                         key={label}
//                         variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
//                         className="mx-1 mb-2"
//                         onClick={() => handlePressButton(isU ? 0 : isV ? 1 : 0, index)}
//                         disabled={loading}
//                       >
//                         {label}
//                       </Button>
//                     );
//                   })}
//                 </ButtonGroup>
//               </Card.Footer>
//             )}
//           </Card>
//         )
//       )}
//     </Container>
//   );
// }

// export default Homepage;


import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, ButtonGroup } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';
import loadingPic from '../loader.svg';
import ErrorMessage from './ErrorMessage'; // Import the ErrorMessage component
import SEO from '../components/SEO';


function Homepage({ defaultImage }) {
  const [prompt, setPrompt] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [imageID, setImageID] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageType, setImageType] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Store the actual File object
  // const [imageToURL, setImageToURL] = useState(null); // Store the object URL
  const fileInputRef = useRef(null);
  const { theme } = useTheme();
  const [error, setError] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(""); // Default to medium quality
  const uriPath = import.meta.env.VITE_uriPath;

  //ian added this 
  const [midURL, setMidURL] = useState('');


  // Check if GPT Image is selected
  const isGptImageSelected = selectedOption === 'gpt-image-1';
  const isMidVideoImageSelected = selectedOption === " --video"



  useEffect(() => {
    if (error) {
      console.log("Error state updated:", error.message);
    }
  }, [error]);

  useEffect(() => {
    // Set initial state from defaultImage prop only if we don't have an image already
    // and we don't have an uploaded image
    if (defaultImage && !imageURL && !uploadedImage) {
      setImageURL(defaultImage.image_url);
      setImageID(defaultImage.image_message_id);
      setImageType(defaultImage.type);
    }
    
    // If we have an uploaded image, clear any default or previously generated image
    if (uploadedImage) {
      setImageURL('');
    }
  }, [defaultImage, imageURL, uploadedImage]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // Clear uploaded image if switching away from GPT Image
    if (option !== 'gpt-image-1' && uploadedImage) {
      setUploadedImage(null);
      setUploadedFile(null);
    }
    
    // Clear any existing errors when changing options
    setError(null);
  };
const handleQualitySelect = (option) => {
    setSelectedQuality(option);
}

  // // Create object URL when uploadedFile changes
  // useEffect(() => {
  //   if (uploadedFile) {
  //     const objectURL = URL.createObjectURL(uploadedFile);
  //     setImageToURL(objectURL);
  //     console.log('Object URL created:', objectURL);
      
  //     // Cleanup function to revoke the object URL
  //     return () => {
  //       URL.revokeObjectURL(objectURL);
  //       console.log('Object URL revoked:', objectURL);
  //     };
  //   } else {
  //     setImageToURL(null);
  //   }
  // }, [uploadedFile]);

  // // Console log imageToURL whenever it changes
  // useEffect(() => {
  //   console.log('imageToURL:', imageToURL);
  // }, [imageToURL]);

  // Handle file uploads
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError({
          message: 'File size too large. Please upload an image smaller than 10MB.'
        });
        return;
      }
      
      // Store the File object for URL creation
      setUploadedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // Base64 data URL for API calls
        // Clear any existing errors
        setError(null);
      };
      reader.onerror = () => {
        setError({
          message: 'Failed to read the uploaded file. Please try another image.'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
    // Set loading to false to ensure any previous loading state is cleared
    setLoading(false);
  };

  

  const handleFetchImage = async () => {
    // Validate input
    if (loading) return;

  if (!prompt && !uploadedImage) {
    setError({ message: 'Please enter a prompt or upload an image.' })
    return;
  }
    setLoading(true);
    setError(null);
    console.time('ImageCreatedTimer');
    
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: prompt,
          model: selectedOption ? selectedOption : ' --v 6.1',
          // Only include image data if GPT Image is selected and an image is uploaded
          ...((isGptImageSelected || isMidVideoImageSelected) && uploadedImage && { imageData: uploadedImage }),
          ...(selectedQuality  && { quality: selectedQuality })
        }),
      };

      const res = await fetch(`${uriPath}/Prompt`, requestOptions);
      
      // Handle non-2xx responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw {
          status: res.status,
          message: errorData.message || `Server error: ${res.status}`,
          details: errorData
        };
      }
      
      const data = await res.json();

      // Always log the response to help with debugging
      console.log("API response:", data);
      
      // Check if the response contains required data
      // if (!data.image_url) {
      //   throw {
      //     message: 'Invalid response from server. Missing image URL.',
      //     details: data
      //   };
      // }


      // Adding midjourneyurl
      data?.midjourneywebsiteurl && setMidURL(data.midjourneywebsiteurl);

      
      // Update all state variables in a single batch
      // This ensures React processes the state changes correctly
      setImageID(data.image_message_id);
      setImageURL(data.image_url);
      setImagePrompt(data.prompt);
      setImageType(data.type);
      setUploadedImage(null); // Clear uploaded image after setting the new URL
      setUploadedFile(null); // Clear uploaded file as well
      window.history.pushState(null, '', `?image=${data.image_message_id}`);
      
      // Log to confirm the URL was set properly
      console.log("Set imageURL to:", data.image_url);
      
      // Clear prompt after successful generation
      setPrompt('');
    } catch (error) {
      console.error('Error fetching image:', error);
      setError(error);
    } finally {
      setLoading(false);
      console.timeEnd('ImageCreatedTimer');
    }
  };

  const handlePressButton = async (row, column) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    console.time('ImageCreatedTimer');
    
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          channel_id: '1103168663617556571',
          message_id: imageID,
          row_: row,
          columns_: column,
        }),
      };

      const res = await fetch(`${uriPath}/Button`, requestOptions);
      
      // Handle non-2xx responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw {
          status: res.status,
          message: errorData.message || `Server error: ${res.status}`,
          details: errorData
        };
      }
      
      const data = await res.json();
      
      // Validate response data
      if (!data.image_url) {
        throw {
          message: 'Invalid response from server. Missing image URL.',
          details: data
        };
      }
      
      setImageID(data.image_message_id);
      setImageURL(data.image_url);
      setImageType(data.type);
    } catch (error) {
      console.error('Error fetching image:', error);
      setError(error);
    } finally {
      setLoading(false);
      // Clear uploaded image
      setUploadedImage(null);
      setUploadedFile(null);
      console.timeEnd('ImageCreatedTimer');
    }
  };

  // Button configurations
  const buttonLabels = ['U1', 'U2', 'U3', 'U4', '↻', 'V1', 'V2', 'V3', 'V4'];

  // Determine the best image URL to use for SEO
  const seoImageUrl = imageURL || (defaultImage && defaultImage.image_url) || null;
  
  return (
    <>
    <SEO
        title="Home"
        image={seoImageUrl}
        description="Generate stunning AI images using our state-of-the-art models"
        pathName="/"
        keywords="AI, image generation, machine learning, generative models, GPT, Dalle"
      />
    <Container className={`py-4 ${theme === 'dark' ? 'text-light' : 'text-dark'}`} style={{ maxWidth: '1000px' }}>
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <h1 className="text-center mb-4">Enter a prompt to create an image</h1>
          
          {/* Hidden file input for image upload */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          {/* Prompt input, camera icon (conditionally), and submit button */}
          <Form onSubmit={(e) => { e.preventDefault(); handleFetchImage(); }}>
            <Form.Group className="mb-3">
              <Form.Label visuallyHidden>Image Prompt</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Enter a prompt"
                  value={prompt}
                  onChange={handlePromptChange}
                  className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                />
                
                {/* Camera icon button - only show when GPT Image is selected */}
                {(isGptImageSelected || isMidVideoImageSelected) && (
                  <Button 
                    onClick={triggerFileInput}
                    variant={theme === 'dark' ? 'light' : 'dark'}
                    className="px-3"
                    title="Upload an image"
                  >
                    <span style={{ fontSize: '1.2rem' }}>📷</span>
                  </Button>
                )}
                
                <Button 
                  onClick={handleFetchImage}
                  variant={theme === 'dark' ? 'light' : 'dark'}
                  className="px-4 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner 
                      as="span" 
                      animation="border" 
                      size="sm" 
                      role="status" 
                      aria-hidden="true" 
                    />
                  ) : 'Generate'}
                </Button>
              </div>
            </Form.Group>
          </Form>
          
          {/* Dropdown for model selection */}
          <div className="d-flex justify-content-center mb-4">
            <Form.Select 
              onChange={(e) => handleOptionSelect(e.target.value)}
              style={{ maxWidth: '300px' }}
              className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
              value={selectedOption}
            >
              <option value="">Midjourney (recommended)</option>
              <option value="gpt-image-1">GPT Image</option>
              <option value=" --niji 6">niji </option>
              <option value="Dalle 3">Dalle 3</option> 
              <option value=" --video">Midjourney Video Creation</option>
            </Form.Select>
          </div>
          {/* Conditional Quality Dropdown - Only for Midjourney (recommended) */}
          {(selectedOption === '' || !selectedOption) && (
            <div className="d-flex justify-content-center mb-4">
              <Form.Select
                onChange={(e) => handleQualitySelect(e.target.value)}
                style={{ maxWidth: '300px' }}
                className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                value={selectedQuality}
              >
                <option value=" --draft">fast</option>
                <option value=" --q 1">Standard</option>
                <option value=" --q 2">High</option>
                <option value=" --q 4">Ultra</option>
              </Form.Select>
            </div>
          )}

          {/* Conditional Motion Dropdown - Only for Midjourney Video Creation */}
          {selectedOption === ' --video' && (
            <div className="d-flex justify-content-center mb-4">
              <Form.Select
                onChange={(e) => handleQualitySelect(e.target.value)}
                style={{ maxWidth: '300px' }}
                className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                value={selectedQuality}
              >
                <option value=" --motion low">Low Motion</option>
                <option value=" --motion high">High Motion</option>
              </Form.Select>
            </div>
          )}
          
          {/* Show GPT Image info when selected */}
          {(isGptImageSelected || isMidVideoImageSelected) && (
            <div className="text-center mb-3 small">
              <p>Upload an image to use as a reference or modify with your prompt</p>
            </div>
          )}
          
          {/* Error Message Component */}
          <ErrorMessage 
            error={error} 
            className={`mb-4 ${theme === 'dark' ? 'error-dark' : ''}`}
            showDetails={false}
          />
        </Col>
      </Row>

      {/* Loading indicator or image display */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <img src={loadingPic} alt="Loading" className="img-fluid" style={{ maxHeight: '100px' }} />
        </div>
      ) : (
        (imageURL || uploadedImage || (defaultImage && defaultImage.image_url)) && (
          <Card
            className={`border-0 mb-5 mx-auto ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}
            style={{ maxWidth: '800px' }}
          >
            {/* Image prompt title or uploaded image indicator */}
            <Card.Header className={`text-center border-0 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
              {uploadedImage && !imageURL ? (
                <h4>Uploaded Image</h4>
              ) : (
                <h4>{imagePrompt || (defaultImage && defaultImage.prompt)}</h4>
              )}
            </Card.Header>
            
            {/* Image display - shows either uploaded image or generated image */}
            <Card.Body className="p-0 d-flex justify-content-center">
              {uploadedImage ? (
                /* Show uploaded image */
                <Card.Img
                  src={uploadedImage}
                  alt="Uploaded image"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '80vh' }}
                />
              ) : imageURL ? (
                /* Show generated/API image */
                <a href={imageURL} target="_blank" rel="noopener noreferrer">
                  <Card.Img
                    key={Date.now() + imageURL} /* Add timestamp to key to force re-render */
                    src={imageURL}
                    alt="Generated image"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '80vh' }}
                    onError={() => {
                      setError({
                        message: "Failed to load the generated image. The server might be busy or the image URL is invalid.",
                      });
                    }}
                  />
                </a>
              ) : defaultImage && defaultImage.image_url ? (
                /* Show default image as fallback */
                <a href={defaultImage.image_url} target="_blank" rel="noopener noreferrer">
                  <Card.Img
                    src={defaultImage.image_url}
                    alt="Default image"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '80vh' }}
                    onError={() => {
                      setError({
                        message: "Failed to load the default image.",
                      });
                    }}
                  />
                </a>
              ) : null}
            </Card.Body>

            {/* Shows the link to the midjourney url when its not working.*/}
          {(["Video"].includes(imageType) ) && (
            <div className="text-center mb-3 mt-4 small">
              <p>Your full sized sharable video at :</p>
               <a 
                  href={midURL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
              > {midURL}</a>  
            </div>
          )}
            
            {/* Action buttons - only show for generated images with valid type */}
            {![null, "Upscale","Video"].includes(imageType) && imageURL && (
              <Card.Footer className={`border-0 text-center py-3 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                <ButtonGroup className="flex-wrap">
                  {buttonLabels.map((label) => {
                    const isU = label.startsWith("U");
                    const isV = label.startsWith("V");
                    const index = label === "↻" ? 4 : parseInt(label[1], 10) - 1;
                    
                    return (
                      <Button
                        key={label}
                        variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                        className="mx-1 mb-2"
                        onClick={() => handlePressButton(isU ? 0 : isV ? 1 : 0, index)}
                        disabled={loading}
                      >
                        {label}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Card.Footer>
            )}
          </Card>
        )
      )}
    </Container>
    </>
  );
}

export default Homepage;