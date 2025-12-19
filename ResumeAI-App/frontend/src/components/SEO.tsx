import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SEO = () => {
  const location = useLocation();
  const canonicalUrl = `https://resume-ai.co.in${location.pathname === '/' ? '' : location.pathname}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ResumeAI",
    "url": "https://resume-ai.co.in",
    "image": "https://resume-ai.co.in/favicon.svg",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Free AI-powered resume builder, ATS checker, and interview prep tool for software engineers.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "120"
    }
  };

  return (
    <Helmet>
      {/* Canonical URL - Fixes Duplicate Content Issues */}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Schema Markup - Tells Google this is a Tool, not a blog */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};