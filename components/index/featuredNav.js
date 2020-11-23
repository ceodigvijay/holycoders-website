import React from "react";

export default function featuredNav() {
  return (
    <>
      <div className="fnav columns">
        <div className="fnav__item column is-one-quarter">
          <img src="/icons/webdev.svg" alt="web development" />
          <p>Web development</p>
        </div>
        <div className="fnav__item column is-one-quarter">
          <img
            src="/icons/algorithms.svg"
            alt="data structures and algorithms"
          />
          <p>DS and Algo</p>
        </div>
        <div className="fnav__item column is-one-quarter">
          <img src="/icons/offer.svg" alt="offers" />
          <p>Deals and Offers</p>
        </div>
        <div className="fnav__item column is-one-quarter">
          <img src="/icons/review.svg" alt="reviews" />
          <p>Reviews</p>
        </div>
      </div>
      <style jsx>{`
        .fnav {
          margin: 50px auto;
          cursor: pointer;
        }

        .fnav__item {
          justify-content: center;
          text-align: center;
          padding: 20px;
          border-radius: 10px;
        }

        .fnav__item img {
          display: block;
          margin: 10px auto;
          height: 150px;
        }

        .fnav__item p {
          font-size: 1.5rem;
          font-weight: 600;
          color: #969494;
          margin: 20px 5px;
        }

        .fnav__item:hover {
          transition: all 0.2s;
          transform: translateZ(50px);
          box-shadow: 0 0px 25px -5px rgba(0, 0, 0, 0.2),
            0 15px 20px -15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
