import React from "react";

function SampleCard({ data , cardClicked}) {
  return (
    <div className="sample-card" onClick={() => cardClicked(data)}>
      <img src={data.url} />
      <div className="sample-card__hover">
        <i className="fa-solid fa-magnifying-glass-plus"></i>
      </div>
    </div>
  );
}

export default SampleCard;
