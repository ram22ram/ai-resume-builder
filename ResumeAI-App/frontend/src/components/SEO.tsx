import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO = ({ title, description, keywords }: SEOProps) => {
  const location = useLocation();
  const canonicalUrl = `https://resume-ai.co.in${location.pathname === '/' ? '' : location.pathname}`;

  // Schema data ko dynamic banaya taaki description match kare
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ResumeAI",
    "url": canonicalUrl,
    "image": "https://resume-ai.co.in/favicon.svg",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": description, // Ab ye dynamic description lega
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "120"
    }
  };

  return (
    <Helmet>
      {/* 1. Page Title (Sabse Important) */}
      <title>{title} | ResumeAI</title>
      
      {/* 2. Meta Description & Keywords */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || "resume builder, AI resume, free CV maker, jobs, software engineer resume"} />

      {/* 3. Social Media Tags (Open Graph) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ResumeAI" />

      {/* 4. Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* 5. Canonical & Schema */}
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};