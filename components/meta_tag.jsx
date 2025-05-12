import React from "react";
import Head from "next/head";

const MetaTag = ({ title, keywords, description, canonicalUrl, imgUrl }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content="Zoomni" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:determiner" content="An" />
      <meta property="og:site_name" content="Zoomni" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image:width" content="960" />
      <meta property="og:image:height" content="400" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgUrl}></meta>
    </Head>
  );
};

export default MetaTag;
