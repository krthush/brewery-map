import axios, { Method } from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.request({
  url: url,
  method: 'GET' as Method,
}).then(res => res.data);

function useBreweries (search?: string) {

  let url = `https://api.openbrewerydb.org/breweries`;
  if (search) url = `https://api.openbrewerydb.org/breweries/search?query=${search}`;

  const { data, error } = useSWR([url], fetcher);

  return {
    breweries: data as Array<any>,
    isLoading: !error && !data,
    isError: error
  }
}

export default useBreweries;