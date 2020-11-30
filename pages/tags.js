import React from "react";
import Layout from "../components/layouts/layout";
import { getAllTags } from "../lib/index";
import Image from "next/image";
import Link from "next/link";
import PageSEO from "../components/seo/page";
export default function tags({ tags }) {
  return (
    <Layout>
      <PageSEO
        slug={`tags`}
        title={`Top 100 Most Popular Tags - HolyCoders`}
        description="The collection of the most popular tags on HolyCoders having tons of articles under them."
      />
      <div className="columns is-multiline my-6 mx-4">
        {tags.map((tag) => {
          return (
            <div className="column is-one-quarter ">
              <Link href={`/tag/${tag.slug}`}>
                <div
                  className="tag-box py-5 px-4"
                  style={{ border: `2px solid ${tag.hex_color}` }}
                >
                  {tag.featured_image ? (
                    <figure className="tag-fig image is-48x48">
                      <Image
                        src={tag.featured_image}
                        alt={tag.name}
                        width="48px"
                        height="48px"
                        className="image is-48x48"
                      />
                    </figure>
                  ) : (
                    ""
                  )}

                  <div className="tag-card-footer has-text-centered mt-2">
                    {tag.name}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .tag-box {
          border-radius: 5px;
          cursor: pointer;
        }
        .tag-box:hover {
          transition: all 0.2s;
          transform: translateZ(50px);
          box-shadow: 0 0px 25px -5px rgba(0, 0, 0, 0.2),
            0 15px 20px -15px rgba(0, 0, 0, 0.2);
        }
        .tag-card-footer {
          font-weight: 600;
          font-size: 20px;
          color: #636e72;
        }
        .tag-fig {
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const tagData = await getAllTags();
  console.log(tagData.data);
  return { props: { tags: tagData.data }, revalidate: 3600 * 24 };
}
