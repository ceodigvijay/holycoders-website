import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import cleanString from "../../../utils/cleanxss";
export default function Seo({
  title,
  featuredImage,
  introduction,
  type,
  tags,
  metaTitle,
  metaDescription,
  publishedAt,
  updatedAt,
  author,
  category,
  slug,
}) {
  //Iterate through tag array of objects and extract names
  const tagNames = tags.map((element) => {
    return cleanString(element.name);
  });
  //Meta title or fallback to title of the Page
  const newMetaTitle = metaTitle ? cleanString(metaTitle) : cleanString(title);

  //Meta description fallback to -> introduction fallback to -> empty string.
  const newMetaDescription = metaDescription
    ? cleanString(metaDescription)
    : introduction
    ? cleanString(introduction)
    : "";

  //If post type is page then domain/slug else domain/category/slug
  const url =
    type === "page"
      ? `https://holycoders.com/${cleanString(slug)}/`
      : `https://holycoders.com/${category}/${cleanString(slug)}/`;

  const jslonld = `
  {
    "@context": "http://schema.org",
    "@type": "Article",
    "publisher": {
      "@type": "Organization",
      "name": "HolyCoders",
      "url": "https://holycoders.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://holycoders.com/logo.svg",
        "caption": "HolyCoders"
      }
     },
    "author": {
      "@type": "Person",
      "name": "${cleanString(author[0].name)}",
      "url": "https://holycoders.com/u/${cleanString(author[0].username)}/"
    },
    "headline": "${newMetaTitle}",
    "url": "${url}",
    "datePublished": "${publishedAt}",
    "dateModified": "${updatedAt}",
    ${
      featuredImage
        ? `"image":{
      "@type": "ImageObject",
      "url":"https://holycoders.com${cleanString(featuredImage)}"
     }, `
        : ""
    }
    ${newMetaDescription ? `"description":"${newMetaDescription}", ` : ""}
    "keywords": "${tagNames.join(", ")}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    } 
  }`;

  return (
    <>
      <NextSeo
        openGraph={{
          title: newMetaTitle,
          description: newMetaDescription ? newMetaDescription : "",
          url: url,
          type: "article",
          article: {
            publishedTime: publishedAt,
            modifiedTime: updatedAt,
            authors: [`https://holycoders.com/u/${author[0].username}/`],
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
        {newMetaDescription ? (
          <meta name="description" content={newMetaDescription} />
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
