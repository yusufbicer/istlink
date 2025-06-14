import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  ogImage = '/og-image.png',
  canonical,
  noindex = false
}: SEOHeadProps) => {
  const { i18n } = useTranslation();

  const siteTitle = 'Bundleist - Turkish Export Consolidation | Simplify Supply Chain Management';
  const siteDescription = 'Revolutionize your Turkish supply chain with Bundleist\'s AI-powered export consolidation platform. Reduce shipping costs by 65%, streamline documentation 15x faster, save 80% time.';
  const siteKeywords = 'Turkish export consolidation, supply chain management Turkey, Turkish suppliers platform, export logistics Turkey, shipping consolidation, supplier management software, Turkey B2B marketplace, export documentation, freight consolidation, Turkish trade platform, Istanbul suppliers, supply chain optimization, export streamlining, consolidation services Turkey, Turkish manufacturer sourcing';

  const finalTitle = title ? `${title} | Bundleist` : siteTitle;
  const finalDescription = description || siteDescription;
  const finalKeywords = keywords || siteKeywords;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', finalKeywords);
    }

    // Update robots meta
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || window.location.href;

    // Update Open Graph meta tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', finalTitle);
    }

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', finalDescription);
    }

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', `${window.location.origin}${ogImage}`);
    }

    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', window.location.href);
    }

    // Update Twitter meta tags
    const twitterTitleMeta = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', finalTitle);
    }

    const twitterDescMeta = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescMeta) {
      twitterDescMeta.setAttribute('content', finalDescription);
    }

    const twitterImageMeta = document.querySelector('meta[property="twitter:image"]');
    if (twitterImageMeta) {
      twitterImageMeta.setAttribute('content', `${window.location.origin}${ogImage}`);
    }

    // Update hreflang attributes based on current language
    const updateHreflang = () => {
      const baseUrl = window.location.origin;
      const hreflangs = [
        { lang: 'en', url: `${baseUrl}/en` },
        { lang: 'tr', url: `${baseUrl}/tr` },
        { lang: 'fr', url: `${baseUrl}/fr` },
        { lang: 'x-default', url: baseUrl }
      ];

      // Remove existing hreflang links
      document.querySelectorAll('link[hreflang]').forEach(link => link.remove());

      // Add new hreflang links
      hreflangs.forEach(({ lang, url }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = url;
        document.head.appendChild(link);
      });
    };

    updateHreflang();
  }, [finalTitle, finalDescription, finalKeywords, ogImage, canonical, noindex, i18n.language]);

  return null;
};

export default SEOHead;