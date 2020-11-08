import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function sideNav({ chapters }) {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  console.log(router.asPath);
  return (
    <aside className="menu px-4">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        {chapters.map((chapter) => {
          return (
            <li>
              {/* Link contains the absolute path */}
              <Link href={chapter.link}>
                <a
                  className={router.asPath === chapter.link ? "is-active" : ""}
                >
                  {chapter.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
