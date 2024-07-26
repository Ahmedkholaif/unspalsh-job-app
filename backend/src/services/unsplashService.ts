import axios from 'axios';
import axiosRetry from 'axios-retry';
import getConfig from '../config/config';

axiosRetry(axios, {
  retries: 4,
  retryDelay: (retryCount) => {
    console.log(`Retry attempt: ${retryCount}`);
    return retryCount * 15 * 1000; // unsplash rate limit is 50 requests per hour for demo account
  },
  retryCondition: (error) => {
    const remainingRateLimit = error.response?.headers['x-ratelimit-remaining'];
    console.log('heads', error.response?.headers);
    const isNetworkError =
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
    const isServerError =
      error.response?.status && error.response?.status >= 500;
    const isRateLimitError = remainingRateLimit === '0';
    console.log(
      `retrying due to isNetworkError: ${isNetworkError}, isServerError: ${isServerError}, isRateLimitError: ${isRateLimitError}`
    );
    return isNetworkError || isServerError || isRateLimitError;
  },
});

export const getRandomSplashImage = async () => {
  try {
    const response = await axios.get(
      `${getConfig().UNSPLASH_RANDOM_IMAGE_URL}`,
      {
        params: {
          client_id: getConfig().UNSPLASH_ACCESS_KEY,
          query: 'food',
        },
      }
    );

    console.log(`Remaining rate limit: ${response.headers['x-ratelimit-remaining']}/${response.headers['x-ratelimit-limit']}`);

    console.log('Fetched random Unsplash image:', response.data.id);
    return response.data;
  } catch (error: any) {
    console.error(
      'Failed to fetch random Unsplash image:',
      error.response.data
    );
    throw error;
  }
};
