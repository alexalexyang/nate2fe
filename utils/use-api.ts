import { useEffect, useState } from "react";

import fetch from "isomorphic-unfetch";

interface Response {
  response: any | null;
  error: object | null;
  loading: boolean;
  args?: object;
}

const initialState = (args: Object) => {
  const response: Response = {
    response: null,
    error: null,
    loading: true,
    ...args,
  };
  return response;
};

function useApi(url: string, options = {}): Response {
  const [state, setState] = useState(() => initialState({}));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          ...options,
        });

        if (res.status >= 400) {
          setState(
            initialState({
              error: await res.json(),
              loading: false,
            })
          );
        } else {
          setState(
            initialState({
              response: await res.json(),
              loading: false,
            })
          );
        }
      } catch (error) {
        setState(
          initialState({
            error: {
              error: error.message,
            },
            loading: false,
          })
        );
      }
    };
    fetchData();
  }, []);
  return state;
}

export default useApi;
