import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://resume-ai.co.in/og-image.jpg', 
  url = 'https://resume-ai.co.in',
  type = 'website',
  keywords
}) => {
  const siteTitle = `${title} | ResumeAI`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;