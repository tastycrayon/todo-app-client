import { useState, useEffect } from "react";

export default function useFetch<dataType>(
  url: string,
  data?: {},
  lazy = false
) {
  type stateType = {
    data: undefined | dataType;
    loading: boolean;
    error: undefined | string;
  };

  const [state, setState] = useState<stateType>({
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
      setState({ data: result, loading: false, error: undefined });
    } catch (err: any) {
      console.error(err);
      setState({ data: undefined, loading: false, error: err.message });
    }
  };
  useEffect(() => {
    if (!lazy) doFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, setData: setState, doFetch };
}
