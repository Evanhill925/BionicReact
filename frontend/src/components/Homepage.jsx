// import React, { useState, useEffect } from 'react';
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
//   const { theme } = useTheme();
  
//   const uriPath = import.meta.env.VITE_uriPath;

//   useEffect(() => {
//     // Set initial state from defaultImage prop
//     if (defaultImage) {
//       setImageURL(defaultImage.image_url);
//       setImageID(defaultImage.image_message_id);
//       setImageType(defaultImage.type);
//     }
//   }, [defaultImage]);

//   const handlePromptChange = (e) => {
//     setPrompt(e.target.value);
//   };

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const handleFetchImage = async () => {
//     if (loading || !prompt.trim()) return;
    
//     setLoading(true);
//     console.time('ImageCreatedTimer');
    
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userInput: prompt,
//           model: selectedOption ? selectedOption : ' --v 6.1'
//         }),
//       };

//       const res = await fetch(`${uriPath}/Prompt`, requestOptions);
//       const data = await res.json();

//       setImageID(data.image_message_id);
//       setImageURL(data.image_url);
//       setImagePrompt(data.prompt.replace('with a small goblin lurking in the background', ''));
//       setImageType(data.type);
//       window.history.pushState(null, '', `?image=${data.image_message_id}`);
//     } catch (error) {
//       console.error('Error fetching image:', error);
//     } finally {
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
          
//           {/* Prompt input and submit button */}
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
//             >
//            <option value="">Midjourney (recommended)</option>
//            <option value="gpt-image-1">GPT Image</option>
//            <option value=" --niji 6">niji </option>
//            <option value="Dalle 3">Dalle 3</option> 
//             </Form.Select>
//           </div>
//         </Col>
//       </Row>


      



//       {/* Loading indicator or image display */}
//       {loading ? (
//         <div className="d-flex justify-content-center my-5">
//           <img src={loadingPic} alt="Loading" className="img-fluid" style={{ maxHeight: '100px' }} />
//         </div>
//       ) : (
//         imageURL && (
//           <Card 
//             className={`border-0 mb-5 mx-auto ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`} 
//             style={{ maxWidth: '800px' }}
//           >
//             {/* Image prompt title */}
//             {(imagePrompt || defaultImage.prompt) && (
//               <Card.Header className={`text-center border-0 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
//                 <h4>{imagePrompt || defaultImage.prompt}</h4>
//               </Card.Header>
//             )}
            
//             {/* Image display */}
//             <Card.Body className="p-0 d-flex justify-content-center">
//               <a href={imageURL} target="_blank" rel="noopener noreferrer">
//                 <Card.Img
//                   src={imageURL}
//                   alt="Generated image"
//                   className="img-fluid rounded shadow"
//                   style={{ maxHeight: '80vh' }}
//                 />
//               </a>
//             </Card.Body>
            
//             {/* Action buttons */}
//             {![null, "Upscale"].includes(imageType) && (
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

function Homepage({ defaultImage }) {
  const [prompt, setPrompt] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageID, setImageID] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageType, setImageType] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const { theme } = useTheme();
  
  const uriPath = import.meta.env.VITE_uriPath;

  // Check if GPT Image is selected
  const isGptImageSelected = selectedOption === 'gpt-image-1';

  useEffect(() => {
    // Set initial state from defaultImage prop
    if (defaultImage) {
      setImageURL(defaultImage.image_url);
      setImageID(defaultImage.image_message_id);
      setImageType(defaultImage.type);
    }
    
    // Clear imageURL if an image is uploaded (to show the uploaded image instead)
    if (uploadedImage) {
      setImageURL('');
    }
  }, [defaultImage, uploadedImage]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // Clear uploaded image if switching away from GPT Image
    if (option !== 'gpt-image-1' && uploadedImage) {
      setUploadedImage(null);
    }
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFetchImage = async () => {
    if (loading || (!prompt.trim() && !uploadedImage)) return;
    
    setLoading(true);
    console.time('ImageCreatedTimer');
    
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: prompt,
          model: selectedOption ? selectedOption : ' --v 6.1',
          // Only include image data if GPT Image is selected and an image is uploaded
          ...(isGptImageSelected && uploadedImage && { imageData: uploadedImage }) 
        }),
      };

      const res = await fetch(`${uriPath}/Prompt`, requestOptions);
      const data = await res.json();

      setImageID(data.image_message_id);
      setImageURL(data.image_url);
      setImagePrompt(data.prompt);
      setImageType(data.type);
      window.history.pushState(null, '', `?image=${data.image_message_id}`);
      
      // Clear the uploaded image only after a successful generation
      setUploadedImage(null);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setPrompt('');
      setLoading(false);
      console.timeEnd('ImageCreatedTimer');
    }
  };

  const handlePressButton = async (row, column) => {
    if (loading) return;
    
    setLoading(true);
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
      const data = await res.json();
      
      setImageID(data.image_message_id);
      setImageURL(data.image_url);
      setImageType(data.type);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
      console.timeEnd('ImageCreatedTimer');
    }
  };

  // Button configurations
  const buttonLabels = ['U1', 'U2', 'U3', 'U4', '↻', 'V1', 'V2', 'V3', 'V4'];

  return (
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
                {isGptImageSelected && (
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
            </Form.Select>
          </div>
          
          {/* Show a note about image upload when GPT Image is selected */}
        </Col>
      </Row>

      {/* Loading indicator or image display */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <img src={loadingPic} alt="Loading" className="img-fluid" style={{ maxHeight: '100px' }} />
        </div>
      ) : (
        (imageURL || uploadedImage) && (
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
              {uploadedImage && !imageURL ? (
                <Card.Img
                  src={uploadedImage}
                  alt="Uploaded image"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '80vh' }}
                />
              ) : (
                <a href={imageURL} target="_blank" rel="noopener noreferrer">
                  <Card.Img
                    src={imageURL}
                    alt="Generated image"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '80vh' }}
                  />
                </a>
              )}
            </Card.Body>
            
            {/* Action buttons - only show for generated images, not uploaded ones */}
            {![null, "Upscale"].includes(imageType) && imageURL && !uploadedImage && (
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
  );
}

export default Homepage;