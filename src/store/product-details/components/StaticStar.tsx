import React from "react";

const StaticStar = ({ score, size = "h3" }) => {
  const normalizedScore = Math.round(2 * score);
  const filledStar = Math.floor(normalizedScore / 2);
  const halfStar = normalizedScore % 2;
  return (
    <>
      {[...Array(filledStar)].map(() => (
        <i className={`bi bi-star-fill ${size}`} style={{ color: "gold" }} />
      ))}

      {[...Array(halfStar)].map(() => (
        <i className={`bi bi-star-half ${size}`} style={{ color: "gold" }} />
      ))}

      {[...Array(5 - filledStar - halfStar)].map(() => (
        <i className={`bi bi-star ${size}`} style={{ color: "gold" }} />
      ))}
    </>
  );
};

export default StaticStar;
