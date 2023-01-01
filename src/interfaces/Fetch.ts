import React from "react";
import { ITodo } from "./Todo";

export interface IFetchStateType<IDataType> {
  data: undefined | IDataType;
  loading: boolean;
  error: undefined | string;
}

export interface IFetchAllDataTypes {
  todos: ITodo[];
  total: number;
}

export type IHandleRefetchTypes = () => Promise<
  IFetchStateType<IFetchAllDataTypes>
>;

export type SetTodosType = React.Dispatch<
  React.SetStateAction<IFetchStateType<IFetchAllDataTypes>>
>;

// export type IHandleRefetchTypes = () => Promise<void>;
