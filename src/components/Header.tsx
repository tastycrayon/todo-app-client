import React from "react";
import { IHandleRefetchTypes } from "../interfaces/Fetch";

interface PropTypes {
  handleRefetch: IHandleRefetchTypes;
}

const Header: React.FC<PropTypes> = ({ handleRefetch }: PropTypes) => {
  return (
    <header className="header w-100">
      <div className="hFlex px-2">
        <h1>Todo App</h1>
        <button onClick={handleRefetch} type="button" className="btn-outline">
          Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
