import Link from "next/link";
import React from "react";
import Layout from "../../components/layouts/layout";
export default function index() {
  return (
    <Layout>
      <div className="content">
        <ul>
          <li>
            <Link href="/course/python/">
              <a>Python</a>
            </Link>
          </li>
          <li>
            <Link href="/course/website-hacking-and-security/">
              <a>Website Hacking and Security</a>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
