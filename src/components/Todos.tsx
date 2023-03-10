import React, { useState } from "react";
import Todo from "./Todo";
import { ITodo } from "../interfaces/Todo";
import { IFetchAllDataTypes, SetTodosType } from "../interfaces/Fetch";

interface PropTypes {
  data: IFetchAllDataTypes;
  setItems: SetTodosType;
}

const Todos: React.FC<PropTypes> = ({ data, setItems }: PropTypes) => {
  const [filter, setfilter] = useState<string>("");
  let emptyMessage = "";
  let filteredTodos: ITodo[] = [];
  const items = data?.todos;

  switch (filter) {
    case "1":
      filteredTodos = items.filter((todo) => todo.completed === true);
      emptyMessage = "No incomplete todo.";
      break;
    case "0":
      filteredTodos = items.filter((todo) => todo.completed === false);
      emptyMessage = "No todo to complete.";
      break;
    default:
      emptyMessage = "Todo is empty.";
      filteredTodos = items;
  }

  const handleEditedItem = (item: ITodo) => {
    const index = items.findIndex((e: ITodo) => e._id === item._id);
    setItems((oldItems) => {
      const newObj = { ...oldItems };
      if (newObj.data?.todos[index]) newObj.data.todos[index] = item;
      return newObj;
    });
  };

  const handleDeletedItem = (item: ITodo) => {
    setItems((oldItems) => {
      const newObj = { ...oldItems };
      if (newObj.data?.todos)
        newObj.data.todos = newObj.data.todos.filter((e) => e._id !== item._id);
      return newObj;
    });
  };

  return (
    <div className="todoContainer w-100">
      <div className="filterWrap hFlex p-1 pr-0">
        <span>Filter ({filteredTodos?.length || 0})</span>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setfilter(e.target.value)
          }
          defaultValue="-1"
        >
          <option value="-1">All</option>
          <option value="1">Completed</option>
          <option value="0">Incomplete</option>
        </select>
      </div>
      <ul className="todoWrap w-100">
        {filteredTodos?.length === 0 && <p className="p-1">{emptyMessage}</p>}
        {filteredTodos &&
          filteredTodos.map((todo: ITodo) => (
            <Todo
              handleEditedItem={handleEditedItem}
              handleDeletedItem={handleDeletedItem}
              key={todo._id}
              item={todo}
              setItems={setItems}
            />
          ))}
      </ul>
    </div>
  );
};

export default Todos;
