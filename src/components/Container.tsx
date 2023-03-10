import React from "react";

interface PropTypes {
  children: JSX.Element;
}

const Container: React.FC<PropTypes> = ({ children }: PropTypes) => {
  return <div className="container cFlex w-100">{children}</div>;
};

export default Container;
