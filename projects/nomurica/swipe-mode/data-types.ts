import { MoviesType } from "../types";

export enum RequestStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
  Idle = "idle",
}

export interface SetPropsGeneric<T> {
  status: RequestStatus;
  data?: T;
  message?: string;
  fetchStatus: RequestStatus;
}

export interface SetProps extends SetPropsGeneric<MoviesType> {}
