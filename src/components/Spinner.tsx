import React from "react";

interface PropTypes {}

const Spinner: React.FC<PropTypes> = () => {
  return (
    <div className="cFlex w-100 h-100 p-10 bg-light">
      <div className="spinner-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
