// export const BASE_URL = 'https://jss.kriyo.net/api/v1';
export const BASE_URL = process.env.REACT_APP_IMAGE_URL;
export const HTTP_UNAUTHORIZED = 401;
export const MOBILE_REGEX =
  // eslint-disable-next-line no-useless-escape
  /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DISTANCE_VARIABLE = 10000;
