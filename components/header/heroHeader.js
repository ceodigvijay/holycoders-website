import React from "react";
import HomePageIcon from "../icons/homepage";
import Image from 'next/image'
export default function heroHead() {
  return (
    <section className="hero" style={{ minHeight: "90vh" }}>
      <div className="hero-body">
        <div className="columns is-vcentered has-text-centered-mobile	">
          <div className="column is-half">
            <h1 className="has-text-weight-medium	is-size-2 is-size-3-mobile has-text-black my-5">
              Be the part of Community
            </h1>
            <h2 className="my-5">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </h2>
            <div className="has-text-centered-mobile">
              <button className="button is-primary is-medium mr-2">Dashboard</button>
              <button className="button is-medium is-light mx-2">Blog</button>
            </div>
          </div>
          <div className="column is-half text-center px-6 py-6">

            <Image src="/home1.svg" width="720" height="600" className="px-2 py-2" />
            {/* <img
              src="https://dummyimage.com/720x600"
              alt="holycoders featured"
              className="px-2 py-2"
            /> */}
            {/* <HomePageIcon width="500" height="500" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
