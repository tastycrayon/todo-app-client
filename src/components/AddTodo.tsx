import React, { useEffect, useState } from "react";
import useFetch from "../hooks/Fetch";
import { SetTodosType } from "../interfaces/Fetch";
import { ITodo } from "../interfaces/Todo";

interface PropTypes {
  disabled: boolean;
  setItems: SetTodosType;
}

const AddTodo: React.FC<PropTypes> = ({ disabled, setItems }: PropTypes) => {
  const url = "todos";
  const [inputVisibility, setInputVisibility] = useState(false);
  const [inputData, setInputData] = useState("");
  const mutation = useFetch<ITodo>(url, undefined, true);
  const { error, loading, doFetch } = mutation;

  const handleAddNew = (item: ITodo) => {
    setItems((oldItems) => {
      const newObj = { ...oldItems };
      if (newObj.data?.todos) newObj.data.todos.unshift(item);
      return newObj;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: inputData, completed: false }),
    };
    const { data, error } = await doFetch(sendData);
    if (data && !error) handleAddNew(data);
    if (!error) {
      setInputVisibility(false);
      setInputData("");
    }
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
            disabled={loading}
            value={inputData}
            autoFocus
            onChange={(e) => setInputData(e.target.value)}
          />
          <div className="dFlex">
            <button
              type="submit"
              className="icon-btn cFlex"
              title="Save"
              disabled={loading}
            >
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
          disabled={disabled}
          className="add-btn"
        >
          ＋ Add New Todo
        </button>
      )}
    </div>
  );
};

export default AddTodo;
