import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import cleanString from "../../utils/cleanxss";
export default function Seo({ title, description, slug }) {
  const url = `https://holycoders.com/${slug ? cleanString(slug) + "/" : ""}`;
  console.log("slug");
  console.log(cleanString(slug));
  return (
    <>
      <NextSeo
        openGraph={{
          title: title,
          description: description,
          url: url,
          type: "page",
        }}
      />
      <Head>
        {description ? (
          <>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
          </>
        ) : (
          ""
        )}
        <link rel="canonical" href={url} />
        <title>{title ? title : "Untitled Page - HolyCoders"}</title>
      </Head>
    </>
  );
}
