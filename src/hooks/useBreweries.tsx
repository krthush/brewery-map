import axios, { Method } from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.request({
  url: url,
  method: 'GET' as Method,
}).then(res => res.data);

function useBreweries (page?: number, city?: string) {

  let url = `https://api.openbrewerydb.org/breweries`;
  if (page) url = `https://api.openbrewerydb.org/breweries?page=${page}`;
  if (city) url = `https://api.openbrewerydb.org/breweries?by_city=${city}`;
  
  console.log(url);

  const { data, error } = useSWR([url], fetcher);

  return {
    breweries: data as Array<any>,
    isLoading: !error && !data,
    isError: error
  }
}

export default useBreweries;