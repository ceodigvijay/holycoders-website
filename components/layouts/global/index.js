import React from "react";
import Navbar from "./navbar";
import HeroHeader from "./heroHeader";
import Footer from "./footer";
export default function Layout({ children, home }) {
  return (
    <>
      <header className="header">
        <Navbar />
        {home ? <HeroHeader /> : ""}
      </header>
      <main className="dark:bg-gray-800">{children}</main>
      <Footer />
    </>
  );
}
