import React, { useEffect, useState } from "react";
import useFetch from "../hooks/Fetch";
import { ITodo } from "../interfaces/Todo";

interface PropTypes {
  item: ITodo;
  handleRefetch: () => Promise<void>;
}

const Todo: React.FC<PropTypes> = ({ item, handleRefetch }: PropTypes) => {
  const url = `todos/${item._id}`;
  const mutation = useFetch(url, undefined, true);
  const { error, loading, doFetch } = mutation;

  const [checked, setChecked] = useState(!!item.completed);
  const [editMode, setEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState(item.title || "");

  const handleCheckBox = async () => {
    setChecked((prev) => !prev);
    const sendData = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: item.title, completed: !checked }),
    };
    await doFetch(sendData);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titleInput, completed: item.completed }),
    };
    await doFetch(sendData);
    setEditMode(false);
    await handleRefetch();
  };

  const handleDelete = async () => {
    const sendData = {
      method: "DELETE",
    };
    await doFetch(sendData);
    await handleRefetch();
  };

  // alert error
  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <li className={`todo-item${loading ? " loading" : ""}`}>
      <form className="hFlex" onSubmit={handleEdit}>
        <label className="form-label dFlex">
          {!editMode && <span>{item.title}</span>}
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleCheckBox()}
          />
          <span className="mark"></span>
        </label>
        {editMode && (
          <input
            className="w-100 mr-1"
            value={titleInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitleInput(e.target.value)
            }
          />
        )}
        {!editMode && (
          <div className="dFlex">
            <div
              onClick={() => setEditMode(true)}
              className="icon-btn cFlex"
              title="Edit"
            >
              <img src="edit.svg" alt="edit" height="16px" width="16px" />
            </div>
            &nbsp;
            <div
              onClick={() => handleDelete()}
              className="icon-btn cFlex"
              title="Delete"
            >
              <img src="delete.svg" alt="delete" height="16px" width="16px" />
            </div>
          </div>
        )}
        {editMode && (
          <div className="dFlex">
            <button type="submit" className="icon-btn cFlex" title="Save">
              <img src="check.svg" alt="save" height="16px" width="16px" />
            </button>
            &nbsp;
            <div
              onClick={() => setEditMode(false)}
              className="icon-btn cFlex"
              title="Back"
            >
              <img src="dots.svg" alt="back" height="16px" width="16px" />
            </div>
          </div>
        )}
      </form>
    </li>
  );
};

export default Todo;
