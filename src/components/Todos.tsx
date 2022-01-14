import React from "react";
import Todo from "./Todo";
import { ITodo } from "../interfaces/Todo";

interface PropTypes {
  items: ITodo[];
  handleRefetch: () => Promise<void>;
}

const Todos: React.FC<PropTypes> = ({ items, handleRefetch }: PropTypes) => {
  return (
    <div className="todoContainer w-100">
      <ul className="todoWrap w-100">
        {items?.length === 0 && <p className="p-2">Todo is empty.</p>}
        {items.map((todo: ITodo) => (
          <Todo handleRefetch={handleRefetch} key={todo._id} item={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
