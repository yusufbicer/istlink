import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface StructuredDataProps {
  type?: 'Organization' | 'WebPage' | 'Service' | 'Article' | 'BreadcrumbList';
  data?: Record<string, any>;
  pageType?: 'home' | 'about' | 'blog' | 'contact' | 'pricing';
}

export const StructuredData = ({ 
  type = 'Organization', 
  data = {},
  pageType = 'home'
}: StructuredDataProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const baseUrl = window.location.origin;
    
    // Organization schema (always present)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bundleist",
      "description": "AI-powered Turkish export consolidation platform for seamless supply chain management",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "foundingDate": "2024",
      "industry": "Supply Chain Management",
      "services": ["Export Consolidation", "Supplier Management", "Logistics Optimization", "Documentation Services"],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "email": "bundleist@gmail.com",
          "contactType": "customer service",
          "availableLanguage": ["English", "Turkish", "French"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "TR",
        "addressLocality": "Istanbul",
        "addressRegion": "Istanbul"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Turkey"
      },
      "knowsAbout": ["Turkish Export", "Supply Chain Consolidation", "Logistics Management", "B2B Marketplace"],
      "sameAs": [
        "https://linkedin.com/company/bundleist",
        "https://twitter.com/bundleist"
      ],
      ...data
    };

    // WebSite schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bundleist",
      "url": baseUrl,
      "description": "Turkish export consolidation platform for efficient supply chain management",
      "inLanguage": ["en", "tr", "fr"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // Service schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Turkish Export Consolidation",
      "description": "Comprehensive export consolidation services for Turkish suppliers and international buyers",
      "provider": {
        "@type": "Organization",
        "name": "Bundleist"
      },
      "serviceType": "Supply Chain Management",
      "areaServed": {
        "@type": "Country",
        "name": "Turkey"
      },
      "offers": {
        "@type": "Offer",
        "description": "Export consolidation platform with transparent pricing",
        "category": "Business Service"
      }
    };

    // FAQ schema for home page
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is export consolidation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Export consolidation is the process of combining multiple smaller shipments from different suppliers into a single, larger shipment to reduce shipping costs and improve efficiency."
          }
        },
        {
          "@type": "Question",
          "name": "How much can I save with Bundleist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bundleist customers typically save 65% on shipping costs, reduce documentation time by 15x, and save 80% of their time managing Turkish suppliers."
          }
        },
        {
          "@type": "Question",
          "name": "What types of products can be consolidated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We consolidate various products including textiles, machinery, automotive parts, chemicals, and other manufactured goods from Turkish suppliers."
          }
        }
      ]
    };

    // BreadcrumbList schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        }
      ]
    };

    const schemas = [organizationSchema, websiteSchema, serviceSchema];
    
    if (pageType === 'home') {
      schemas.push(faqSchema as any);
    }
    
    schemas.push(breadcrumbSchema as any);

    // Remove existing structured data
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      if (script.textContent?.includes('"@context": "https://schema.org"')) {
        script.remove();
      }
    });

    // Add new structured data
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, [type, data, pageType, i18n.language]);

  return null;
};

export default StructuredData;