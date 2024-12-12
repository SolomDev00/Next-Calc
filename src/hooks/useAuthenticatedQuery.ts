/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Custom React hook for authenticated GET requests using `@tanstack/react-query`.
 *
 * @interface IAuthenticatedQuery - Interface for defining the parameters of the `useAuthenticatedQuery` hook.
 * @property {string[]} queryKey - Unique key for caching and identifying the query.
 * @property {string} URL - Endpoint URL for the GET request.
 * @property {AxiosRequestConfig} [config] - Optional Axios configuration for customizing the request (e.g., headers).
 * @property {boolean} [refetchOnAction=false] - If true, it will refetch data when a successful action occurs.
 *
 * @param {IAuthenticatedQuery} options - The options for configuring the `useAuthenticatedQuery` hook.
 *
 * @returns An object containing:
 * - `data`: The data returned from the API, if the request was successful.
 * - `error`: The error object if an error occurred during the fetch.
 * - `isLoading`: Boolean indicating if the query is currently loading.
 * - `isFetching`: Boolean indicating if the query is being refetched.
 * - `refetch`: Function to manually refetch the data.
 * - `refetchData`: Function to invalidate the current query and trigger a refetch.
 *
 * @example
 * const { data, error, isLoading, refetchData } = useAuthenticatedQuery({
 *   queryKey: ["user", userId],
 *   URL: `/api/user/${userId}`,
 *   config: { headers: { Authorization: `Bearer ${token}` } },
 *   refetchOnAction: true,
 * });
 *
 * useEffect(() => {
 *   if (data) {
 *     console.log("Fetched data:", data);
 *   }
 * }, [data]);
 *
 * return (
 *   <div>
 *     {isLoading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
 *     {error && <p>Error: {error.message}</p>}
 *     <button onClick={refetchData}>Refetch Data</button>
 *   </div>
 * );
 */

import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
  queryKey: string[];
  URL: string;
  config?: AxiosRequestConfig;
  refetchOnAction?: boolean;
}

const useAuthenticatedQuery = ({
  queryKey,
  URL,
  config,
  refetchOnAction = false,
}: IAuthenticatedQuery) => {
  const queryClient = useQueryClient();

  const refetchData = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const query = useQuery<any, Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(URL, config);
      return data;
    },
    onSuccess: () => {
      if (refetchOnAction) {
        refetchData();
      }
    },
  } as UseQueryOptions<any, Error>);

  return { ...query, refetchData };
};

export default useAuthenticatedQuery;
