import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import Head from "next/head";
export default function Seo({
  title,
  featuredImage,
  tags,
  metaTitle,
  metaDescription,
  publishedAt,
  updatedAt,
  author,
  category,
  slug,
}) {
  const tagNames = tags.map((element) => {
    return element.name;
  });
  const newMetaTitle = metaTitle
    ? metaTitle.replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    : title.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  const newMetaDescription = metaDescription
    ? metaDescription.replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    : undefined;
  const url = `https://holycoders.com/${category}/${slug}/`;
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${newMetaTitle}",
    "datePublished": "${publishedAt}",
    "dateModified": "${updatedAt}",
    ${featuredImage ? `"image":"https://holycoders.com${featuredImage}", ` : ""}
    "author": {
      "@type": "Person",
      "name": "${author[0].name}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HolyCoders",
      "logo": {
        "@type": "ImageObject",
        "url": "https://holycoders.com/icon.svg"
      }
    },
    ${newMetaDescription ? `"description":"${newMetaDescription}", ` : ""}
  }`;
  return (
    <>
      <NextSeo
        openGraph={{
          title: newMetaTitle,
          description: metaDescription ? metaDescription : "",
          url: url,
          type: "article",
          article: {
            publishedTime: publishedAt,
            modifiedTime: updatedAt,
            authors: [`https://holycoders.com/author/${author.username}/`],
            tags: tagNames,
          },
          images: [
            {
              url: featuredImage ? featuredImage : "",
              alt: title,
            },
          ],
        }}
      />
      <Head>
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : (
          ""
        )}
        <link
          rel="canonical"
          href={`https://holycoders.com/${category}/${slug}/`}
        />
        <title>{metaTitle ? metaTitle : title}</title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jslonld }}
          key="jsonld-article"
        />
      </Head>
    </>
  );
}
