import React from "react";
import Todo from "./Todo";
import { ITodo } from "../interfaces/Todo";

interface PropTypes {
  items: ITodo[];
  handleRefetch: () => Promise<void>;
}

const Todos: React.FC<PropTypes> = ({ items, handleRefetch }: PropTypes) => {
  return (
    <div className="todoContainer">
      <ul className="todoWrap w-100">
        {items.map((todo: ITodo) => (
          <Todo handleRefetch={handleRefetch} key={todo._id} item={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
