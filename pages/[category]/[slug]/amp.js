import React from "react";
import { useAmp } from 'next/amp'
import Head from 'next/head'
export const config = { amp: true };

export default function amp() {
    const isAmp = useAmp()

  return (
    <>
      <Head>
        <title>The Cat</title>
      </Head>
      <header>
      <a href="/">HolyCoders</a>
      </header>
      <h1>The Cat (AMP-first Page)</h1>
      <p className="caption">Meowwwwwwww</p>
        <amp-img
          alt="Mountains"
          fallback=""
          width="550"
          height="368"
          src="https://amp.dev/static/inline-examples/images/mountains.jpg"
        ></amp-img>
      <p>
        Cat ipsum dolor <a href={isAmp ? '/dog?amp=1' : '/dog'}>sit amet</a>,
        eat grass, throw it back up but refuse to leave cardboard box or groom
        yourself 4 hours - checked, have your beauty sleep 18 hours - checked,
        be fabulous for the rest of the day - checked!. Hide from vacuum
        cleaner. Chirp at birds chew foot chase the pig around the house and
        meoooow!. Chase ball of string climb a tree, wait for a fireman jump to
        fireman then scratch his face claw drapes, for meow to be let in yet
        attack dog, run away and pretend to be victim meow loudly just to annoy
        owners.
      </p>

      <style jsx>{`
          header{
              background-color: #333;
              color: #fff;
              font-size: 1.6rem;
              padding: 10px;
              text-align:center;
          }
          header a{
              color: #fff;
              text-decoration: none;
          }
        h1 {
          margin-bottom: 5px;
        }
        p {
          font-size: 18px;
          line-height: 30px;
          margin-top: 30px;
        }
        .caption {
          color: #ccc;
          margin-top: 0;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
