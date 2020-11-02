import React from "react";
import HomePageIcon from "../icons/homepage";
export default function heroHead() {
  return (
    <section className="hero" style={{ minHeight: "90vh" }}>
      <div className="hero-body">
        <div className="container columns is-vcentered">
          <div className="column is-half">
            <h1 className="title is-2">
              Join the{" "}
              <span className="has-text-primary">Coders Community</span>. Learn,
              code and share new things.
            </h1>
            {/* <h2 className="subtitle is-5">We love privacy and transparency in data collection.</h2> */}
            <div className="has-text-centered">
              <button className="button is-primary is-large">
                Join the Community.
              </button>
            </div>
          </div>
          <div className="column is-half text-center">
              <HomePageIcon width="500" height="500"/>
          </div>
        </div>
      </div>
      <style jsx>{`
       
      `}</style>
    </section>
  );
}
