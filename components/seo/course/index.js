import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import Head from "next/head";
import cleanString from "../../../utils/cleanxss";

export default function Seo({ title, metaTitle, metaDescription, courseSlug }) {
  const url = `https://holycoders.com/learn/${cleanString(courseSlug)}/`;

  const newMetaTitle = metaTitle
    ? metaTitle.replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    : title.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  const newMetaDescription = metaDescription
    ? metaDescription.replace(/"/g, "&quot;").replace(/'/g, "&apos;")
    : undefined;
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Course",
    "name": "${newMetaTitle}",
    "description": "${newMetaDescription}",  
    "provider": {
        "@type": "Organization",
        "name": "HolyCoders",
        "sameAs": "https://holycoders.com/"
      }
  }`;
  return (
    <>
      <NextSeo
        openGraph={{
          title: newMetaTitle,
          description: metaDescription ? metaDescription : "",
          url: url,
          type: "course",
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
