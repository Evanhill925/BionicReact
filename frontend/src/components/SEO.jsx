// components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types'; // For prop validation
import logo from "../crlogo.png"

function SEO({ 
  title,
  description,
  image,
  imageAlt,
  pathName,
  modelName,
  keywords,
  author,
  structuredData
}) {
  // Default values and site constants
  const siteName = "Bionic Crayons";
  const siteUrl = "https://bionic-crayons.com"; 
  const defaultDescription = "Generate amazing images with AI models and APIs";
  const defaultImage = `${siteUrl}/${logo}`; // Your default preview image
  
  // Construct final values
  const metaTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const canonicalUrl = pathName ? `${siteUrl}${pathName}` : siteUrl;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={imageAlt || metaDescription} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={imageAlt || metaDescription} />
      
      {/* Image-specific meta tags */}
      {modelName && <meta name="image:model" content={modelName} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Structured Data for SEO (optional) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Prop validation
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  pathName: PropTypes.string,
  modelName: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  structuredData: PropTypes.object
};

export default SEO;