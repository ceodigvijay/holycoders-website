import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import Head from "next/head";
import cleanString from "../../../utils/cleanxss";

export default function Seo({
  title,
  metaTitle,
  metaDescription,
  publishedAt,
  updatedAt,
  author,
  slug,
  courseSlug,
}) {
  const url = `https://holycoders.com/learn/${cleanString(
    courseSlug
  )}/lesson/${cleanString(slug)}/`;

  const newMetaTitle = metaTitle
    ? metaTitle.replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    : title.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  const newMetaDescription = metaDescription
    ? metaDescription.replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    : undefined;
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${newMetaTitle}",
    "datePublished": "${new Date(publishedAt).toISOString()}",
    "dateModified": "${new Date(updatedAt).toISOString()}",
    "author": {
      "@type": "Person",
      "name": "${author.name}"
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
          },
        }}
      />
      <Head>
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : (
          ""
        )}
        <link rel="canonical" href={url} />
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
