import React from "react";
import AddTodo from "./components/AddTodo";
import Container from "./components/Container";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Todos from "./components/Todos";
import useFetch from "./hooks/Fetch";
import { IFetchAllDataTypes } from "./interfaces/Fetch";
import "./style.css";

function App() {
  const query = useFetch<IFetchAllDataTypes>("todos");
  const { data, loading, error, doFetch: refetchTodos, setData } = query;

  return (
    <Container>
      <>
        <Header handleRefetch={refetchTodos} />
        {error && <div>{JSON.stringify(error)}</div>}
        {loading && <Spinner />}
        {!loading && !error && data?.todos && (
          <Todos items={data?.todos} setItems={setData} />
        )}
        <AddTodo setItems={setData} disabled={!!(loading || error)} />
      </>
    </Container>
  );
}

export default App;
