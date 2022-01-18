import React, { useEffect, useState } from "react";
import useFetch from "../hooks/Fetch";
import { IHandleRefetchTypes } from "../interfaces/Fetch";

interface PropTypes {
  disbaled: boolean;
  handleRefetch: IHandleRefetchTypes;
}

const AddTodo: React.FC<PropTypes> = ({
  disbaled,
  handleRefetch,
}: PropTypes) => {
  const url = "todos";
  const [inputVisibility, setInputVisibility] = useState(false);
  const [inputData, setInputData] = useState("");
  const mutation = useFetch(url, undefined, true);
  const { error, loading, doFetch } = mutation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: inputData, completed: false }),
    };
    await doFetch(sendData);
    setInputVisibility(false);
    setInputData("");
    await handleRefetch();
  };

  useEffect(() => {
    if (error) alert(error);
  }, [error]);
  return (
    <div className="add-btn-wrap cFlex">
      {inputVisibility && (
        <form
          className={`hFlex addInputWrap${loading ? " loading" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <div className="dFlex">
            <button type="submit" className="icon-btn cFlex" title="Save">
              <img src="check.svg" alt="save" height="16px" width="16px" />
            </button>
            &nbsp;
            <div
              onClick={() => setInputVisibility(false)}
              className="icon-btn cFlex"
              title="Back"
            >
              <img src="dots.svg" alt="back" height="16px" width="16px" />
            </div>
          </div>
        </form>
      )}
      {!inputVisibility && (
        <button
          onClick={() => setInputVisibility(true)}
          type="button"
          disabled={disbaled}
          className="add-btn"
        >
          ＋ Add New Todo
        </button>
      )}
    </div>
  );
};

export default AddTodo;
