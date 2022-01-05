export type FetcherError = {
  name: string,
  message: string,
  stack?: string,

  info?: string,
  status?: number
};

export const API_BASE_URL = '/api/v1';

/**
 * Dedicated to SWR hook usage
 *
 * Handle url caller result in error by throwing an exception
 * @param url the API endpoint
 * @returns any JSON received from the API call
 * @throws FetcherError
 */
const fetcher = async (url: string): Promise<any> => {
  const res: Response = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: FetcherError = new Error('An error occurred while fetching the data')
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default fetcher;
