import { Dispatch, SetStateAction } from "react";
import { RequestStatus, SetProps } from "./data-types";

import fetch from "isomorphic-unfetch";

const fetchSet = async (
  set: SetProps,
  setSet: Dispatch<SetStateAction<SetProps>>
) => {
  const fetchedMovies = await (
    await fetch(`/api/nomurica/discover?numOfMovies=${5}`)
  ).json();

  setSet({
    ...set,
    data: fetchedMovies,
    status: RequestStatus.Success,
    fetchStatus: RequestStatus.Success,
  });
};

export const fetchIfEmpty = (
  set: SetProps,
  setSet: Dispatch<SetStateAction<SetProps>>
) => {
  const isEmpty = !set.data || !set.data.length;

  if (isEmpty && set.fetchStatus !== RequestStatus.Pending) {
    setSet({
      ...set,
      status: RequestStatus.Pending,
      fetchStatus: RequestStatus.Pending,
    });
    fetchSet(set, setSet);
  }
};

export const switchSet = (
  set1: SetProps,
  set2: SetProps,
  setDisplaySet: Dispatch<SetStateAction<string>>
) => {
  const isEmptySet1 = !set1.data || !set1.data.length;
  const isEmptySet2 = !set2.data || !set2.data.length;

  if (isEmptySet1 && isEmptySet2) {
    return setDisplaySet("set1");
  }

  if (isEmptySet1 && !isEmptySet2) {
    return setDisplaySet("set2");
  }

  if (!isEmptySet1 && isEmptySet2) {
    return setDisplaySet("set1");
  }
};
