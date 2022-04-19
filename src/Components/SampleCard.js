import React from "react";

function SampleCard({ data , cardClicked}) {
  return (
    <div className="sample-card" onClick={() => cardClicked(parseInt(data.index))}>
      <div className="img-container" style={{backgroundImage:`url("${data.url}")`}}>
      </div>
      <div className="sample-card__hover">
        <i className="fa-solid fa-magnifying-glass-plus"></i>
      </div>
    </div>
  );
}

export default SampleCard;
