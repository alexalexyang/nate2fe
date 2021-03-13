import { ComponentType, Dispatch, SetStateAction } from "react";

export enum RequestStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
  Idle = "idle",
}

export interface ContentRequest<T> {
  status: RequestStatus;
  data?: T;
  message?: string;
  fetchStatus: RequestStatus;
}

export interface StateProps<T> {
  set: ContentRequest<T>;
  setSet: Dispatch<SetStateAction<ContentRequest<T>>>;
}

export type RenderComponent = ComponentType;

export interface SwipeFuncProps {
  noFunc: any;
  yesFunc: any;
}

export interface ContentProps {
  id: string;
  originalTitle?: string;
  title?: string;
  releaseDate?: string;
  productionCountries?: string[];
  languages?: string[];
  images?: string[];
  trailers?: { url?: string; type?: string }[];
  synopsis?: string;
  authors?: string[];
  editOn?: { org?: string; url?: string }[];
  likes?: number;
}
