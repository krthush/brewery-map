import axios, { Method } from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.request({
  url: url,
  method: 'GET' as Method,
}).then(res => res.data);

function useBreweries (page?: number) {

  let url = `https://api.openbrewerydb.org/breweries`;
  if (page) url = `https://api.openbrewerydb.org/breweries?page=${page}`;

  const { data, error } = useSWR([url], fetcher);

  return {
    breweries: data as Array<any>,
    isLoading: !error && !data,
    isError: error
  }
}

export default useBreweries;