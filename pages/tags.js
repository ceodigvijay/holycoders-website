import React from "react";
import Layout from "../components/layouts/layout";
import { getAllTags } from "../lib/index";
export default function tags({ tags }) {
  return (
    <Layout>
      <div className="columns is-multiline mt-6">
        {tags.map((tag) => {
          return (
            <div className="column is-one-quarter ">
              <div className="tag-box py-5 px-4" style={{border: `4px solid ${tag.hex_color}`}}>
                <figure className="tag-fig image is-48x48">
                  <img
                    src={tag.featured_image}
                    alt={tag.name}
                    width="48px"
                    height="48px"
                    className="image is-48x48"
                  />
                </figure>
                <div className="tag-card-footer has-text-centered mt-2">{tag.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .tag-box {
          border-radius: 5px;
          cursor: pointer;
        }
        .tag-fig {
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const tagData = await getAllTags();
  console.log(tagData.data);
  return { props: { tags: tagData.data } };
}
