import Head from 'next/head';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  jsonLd 
}) => {
  const siteTitle = 'MovieFinder - Discover Movies';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Discover the latest movies, search for your favorites, and explore detailed information about films, cast, and ratings.';
  const metaDescription = description || defaultDescription;
  const defaultImage = 'https://yourdomain.com/og-image.jpg';
  const metaImage = image || defaultImage;
  const siteUrl = url || 'https://yourdomain.com';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* OpenGraph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default SEO;