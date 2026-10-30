import { absoluteSiteUrl, sitePath } from "../lib/site";
import styles from "./breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem", position: index + 1, name,
      item: absoluteSiteUrl(path),
    })),
  };
  return <>
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>{items.map(({ name, path }, index) => <li key={path}>
        {index === items.length - 1
          ? <span aria-current="page">{name}</span>
          : <a href={sitePath(path)}>{name}</a>}
      </li>)}</ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  </>;
}
