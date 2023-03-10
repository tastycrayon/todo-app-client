import React, { useEffect, useState } from "react";
import useFetch from "../hooks/Fetch";
import { ITodo } from "../interfaces/Todo";
import { SetTodosType } from "../interfaces/Fetch";

interface PropTypes {
  item: ITodo;
  setItems: SetTodosType;
  handleEditedItem: (item: ITodo) => void;
  handleDeletedItem: (item: ITodo) => void;
}
const Todo: React.FC<PropTypes> = ({
  item,
  setItems,
  handleEditedItem,
  handleDeletedItem,
}: PropTypes) => {
  const url = `todos/${item._id}`;
  const mutation = useFetch<ITodo>(url, undefined, true);
  const { error, loading, doFetch } = mutation;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(item.title || "");

  const handleCheckBox = async () => {
    const sendData = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: item.title, completed: !item.completed }),
    };
    const { data, error } = await doFetch(sendData);
    if (!error && data) {
      setItems((oldItems) => {
        const newObj = { ...oldItems };
        if (!newObj.data?.todos) return newObj;
        const index = newObj.data?.todos.findIndex(
          (e: ITodo) => e._id === data._id
        );
        if (index === -1) return newObj;
        newObj.data.todos[index] = data;
        return newObj;
      });
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titleInput, completed: item.completed }),
    };
    const { data, error } = await doFetch(sendData);
    if (data) handleEditedItem(data);
    if (!error) setEditMode(false);
  };
  const handleDelete = async () => {
    const sendData = {
      method: "DELETE",
    };
    const { data } = await doFetch(sendData);
    if (data) handleDeletedItem(data);
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
            disabled={loading}
            checked={item.completed}
            onChange={() => handleCheckBox()}
          />
          <span className="mark"></span>
        </label>
        {editMode && (
          <input
            type="text"
            className="w-100 mr-1"
            value={titleInput}
            autoFocus
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
