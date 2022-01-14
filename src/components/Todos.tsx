import React, { useState } from "react";
import Todo from "./Todo";
import { ITodo } from "../interfaces/Todo";

interface PropTypes {
  items: ITodo[];
  handleRefetch: () => Promise<void>;
}

const Todos: React.FC<PropTypes> = ({ items, handleRefetch }: PropTypes) => {
  const [filter, setfilter] = useState("");

  let filteredTodos = [];
  switch (filter) {
    case "1":
      filteredTodos = items.filter((todo) => todo.completed === true);
      break;
    case "0":
      filteredTodos = items.filter((todo) => todo.completed === false);
      break;
    default:
      filteredTodos = items;
  }

  return (
    <div className="todoContainer w-100">
      <div className="filterWrap hFlex p-1">
        <span>Filter ({filteredTodos?.length || 0})</span>
        <select
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setfilter(e.target.value)
          }
        >
          <option value="" selected>
            All
          </option>
          <option value="1">Completed</option>
          <option value="0">Incomplete</option>
        </select>
      </div>
      <ul className="todoWrap w-100">
        {filteredTodos?.length === 0 && <p className="p-2">Todo is empty.</p>}
        {filteredTodos.map((todo: ITodo) => (
          <Todo handleRefetch={handleRefetch} key={todo._id} item={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
