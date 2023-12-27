import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export default function HelmetComponent({imageDict}){
    const [url, setUrl] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (imageDict && imageDict.imageDict) {
            setUrl(imageDict.imageDict.image_url);
            setDesc(imageDict.imageDict.prompt);
        }
    }, [imageDict]);

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