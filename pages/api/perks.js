
import fetcher from "./common";
import useSWR from "swr";

function fetchPerks() {
  const url = process.env.NEXT_PUBLIC_API_HOST+ "/perks/all";
  const { data , error } = useSWR(url, fetcher);

  return {
    perks: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export { fetchPerks };
