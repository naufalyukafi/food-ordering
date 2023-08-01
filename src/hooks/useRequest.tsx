import useSwr from "swr";
import { baseURL } from "../api";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useRequest = (path: string, name?: any) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = name ? baseURL + path + "/" + name : baseURL + path;

  const { data, error } = useSwr(url, fetcher);

  return { data, error };
};
