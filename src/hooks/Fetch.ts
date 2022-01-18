import { useState, useEffect } from "react";
import { IFetchStateType } from "../interfaces/Fetch";

export default function useFetch<StateTypes>(
  url: string,
  data?: {},
  lazy = false
) {
  const [state, setState] = useState<IFetchStateType<StateTypes>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const doFetch = async (lazyData?: {}) => {
    setState({ data: undefined, loading: true, error: undefined });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || ""}/${url}`,
        lazyData || data
      );
      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();

      const obj = { data: result, loading: false, error: undefined };
      setState(obj);
      return obj;
    } catch (err: any) {
      console.error(err);

      const obj = { data: undefined, loading: false, error: err.message };
      setState(obj);
      return obj;
    }
  };
  useEffect(() => {
    if (!lazy) {
      doFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, setData: setState, doFetch };
}
