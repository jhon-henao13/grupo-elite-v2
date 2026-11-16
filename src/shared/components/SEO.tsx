interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string;
  author?: string;
  noindex?: boolean;
}

const SITE_URL = 'https://grupoelite-v2.vercel.app'; // ← cambia cuando tengas dominio final
const DEFAULT_IMAGE = '/img/mockup-dashboard2.png';

export const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  keywords,
  author = 'Grupo Elite',
  noindex = false,
}: SEOProps) => {
  const fullUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <>
      <title>{title} | Grupo Elite</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph (WhatsApp, LinkedIn, Facebook) */}
      <meta property="og:site_name" content="Grupo Elite" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_CO" />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {publishedTime && <meta property="article:author" content={author} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@grupoelite_05" />
      <meta name="twitter:creator" content="@estiguar_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
    </>
  );
};