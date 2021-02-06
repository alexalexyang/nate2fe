import { ContentRequest, RequestStatus } from "../../types/types";
import { Dispatch, SetStateAction } from "react";

import fetch from "isomorphic-unfetch";

const fetchSet = async <T>(
  set: ContentRequest<T[]>,
  setSet: Dispatch<SetStateAction<ContentRequest<T[]>>>,
  url: string
) => {
  setSet({
    ...set,
    data: await (await fetch(url)).json(),
    status: RequestStatus.Success,
    fetchStatus: RequestStatus.Success,
  });
};

export const fetchIfEmpty = <T>(
  set: ContentRequest<T[]>,
  setSet: Dispatch<SetStateAction<ContentRequest<T[]>>>,
  url: string
) => {
  const isEmpty = !set.data || !set.data.length;

  if (isEmpty && set.fetchStatus !== RequestStatus.Pending) {
    setSet({
      ...set,
      status: RequestStatus.Pending,
      fetchStatus: RequestStatus.Pending,
    });
    fetchSet<T>(set, setSet, url);
  }
};

export const switchSet = <T>(
  set1: ContentRequest<T[]>,
  set2: ContentRequest<T[]>,
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
