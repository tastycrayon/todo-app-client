import React from "react";
import AddTodo from "./components/AddTodo";
import Container from "./components/Container";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Todos from "./components/Todos";
import useFetch from "./hooks/Fetch";
import { ITodo } from "./interfaces/Todo";
import "./style.css";

interface IFetchData {
  todos: ITodo[];
  total: number;
}

function App() {
  const query = useFetch<IFetchData>("todos");
  const { data, loading, error, doFetch: refecthTodos } = query;

  return (
    <Container>
      <>
        <Header handleRefetch={refecthTodos} />
        {error && <div>{JSON.stringify(error)}</div>}
        {loading && <Spinner />}
        {!loading && !error && data?.todos && (
          <Todos handleRefetch={refecthTodos} items={data?.todos} />
        )}
        <AddTodo handleRefetch={refecthTodos} disbaled={!!(loading || error)} />
      </>
    </Container>
  );
}

export default App;
