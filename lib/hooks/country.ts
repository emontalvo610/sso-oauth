import type { Country, State } from '@lib/types/country';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getCountries = async () => {
  const response = await axios.get<{ results: Country[] }>(
    '/api/proxy/v1/data/lookup_countries'
  );
  return response.data;
};

export const useGetCountries = () => {
  return useQuery({
    queryKey: ['countries_lookup_data'],
    queryFn: getCountries,
    initialData: { results: [] }
  });
};

export const getStates = async () => {
  const response = await axios.get<{ results: State[] }>(
    '/api/proxy/v1/data/lookup_states'
  );
  return response.data;
};

export const useGetStates = () => {
  return useQuery({
    queryKey: ['states_data'],
    queryFn: getStates,
    initialData: { results: [] }
  });
};
