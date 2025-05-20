import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

function HelmetComponent({ imageDict }) {
    const [url, setUrl] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        console.log('Component mounted or imageDict changed');
        console.log(imageDict);

        // Check if imageDict is not null and not an empty object
        if (imageDict && Object.keys(imageDict).length !== 0) {
            console.log('Updating state with new imageDict values');

            setUrl(imageDict.image_url || '');
            setDesc(imageDict.prompt || '');
        }
    }, [imageDict]); // Include imageDict as a dependency so it updates when imageDict changes

    return (
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
};

export default HelmetComponent;