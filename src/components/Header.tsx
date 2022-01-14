import React from "react";

interface PropTypes {}

const Header: React.FC<PropTypes> = () => {
  return (
    <header className="header w-100">
      <div className="cFlex">
        <h1>Todo App</h1>
      </div>
    </header>
  );
};

export default Header;
