import React from "react";
import { Helmet } from "react-helmet";

const HelmetComponent = (imageDict) => (
    console.log(imageDict),
    url = imageDict.imageDict.image_url,
    desc = imageDict.imageDict.prompt,
  <>
    <Helmet>

     <title>Bionic Crayons</title>
     <meta name="description" content="Create free and fun images with AI! "/>

    <meta property="og:url" content="http://bionic-crayons.com/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="Bionic Crayons"/>
    <meta property="og:description" content={desc}/>
    <meta property="og:image" content={url}/>

    <meta name="twitter:card" content="summary_large_image"/>
    <meta property="twitter:domain" content="bionic-crayons.com"/>
    <meta property="twitter:url" content="http://bionic-crayons.com/"/>
    <meta name="twitter:title" content="Bionic Crayons"/>
    <meta name="twitter:description" content={desc}/>
    <meta name="twitter:image" content={url}/>

 
    </Helmet>
  </>
);

export default HelmetComponent;