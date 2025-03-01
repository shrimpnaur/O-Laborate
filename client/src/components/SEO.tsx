
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const SEO = ({ 
  title, 
  description = "O-Labs - The Smart Choice For Future Learning", 
  keywords = "education, learning, online courses, e-learning, programming, mathematics, science",
  image = "/logo.svg"
}: SEOProps) => {
  const siteTitle = `${title} | O-Labs`;
  
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Favicon */}
      <link rel="icon" href="/logo.svg" />
    </Helmet>
  );
};

export default SEO;
