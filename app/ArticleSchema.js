import { absoluteSiteUrl } from '../lib/site';
// Editorial content only: no invented dates, author, rating or rich-result promise.
export default function ArticleSchema({ path, headline, description }) {
  const data = { '@context': 'https://schema.org', '@type': 'Article',
    headline, description, mainEntityOfPage: absoluteSiteUrl(path),
    publisher: { '@type': 'Organization', name: 'FlashLock', url: absoluteSiteUrl('/') } };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }} />;
}
