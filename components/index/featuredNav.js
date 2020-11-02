import React from "react";

export default function featuredNav() {
  return (
    <>
      <div className="fnav">
        <div className="fnav__item">
          <img src="/icons/webdev.svg" alt="web development" />
          <p>Web development</p>
        </div>
        <div className="fnav__item">
          <img src="/icons/algorithms.svg" alt="data structures and algorithms" />
          <p>DS and Algo</p>
        </div>
        <div className="fnav__item">
          <img src="/icons/offer.svg" alt="offers" />
          <p>Deals and Offers</p>
        </div>
        <div className="fnav__item">
          <img src="/icons/review.svg" alt="reviews" />
          <p>Reviews</p>
        </div>
      </div>
      <style jsx>{`
      .fnav {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	margin: 50px auto;
	cursor: pointer;
}

.fnav__item {
	justify-content: center;
	text-align: center;
	max-width: 300px;
	padding: 10px;
	border: 2px solid #36a666;
	border-radius: 10px;
	margin: 10px;
}

.fnav__item img {
	display: block;
	margin: 10px auto;
	height: 200px;
}

.fnav__item p {
	font-size: 1.5rem;
	color: #969494;
}

.fnav__item:hover {
  transition: all 0.3s;
  transform: translateY(-20px);
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 992px) {
	.fnav {
		grid-template-columns: 50% 50%;
	}
}

@media (max-width: 600px) {
	.fnav {
		grid-template-columns: 100%;
	}
}
        `}</style>
    </>
  );
}
