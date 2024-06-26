// Get access token from localstorage
const getAccessToken = () => {
  const state = JSON.parse(localStorage.getItem("__tkn__sts") ?? "{}");
  return state["__a__t"];
};

// Set access token to localstorage
const setAccessToken = (__a__t) => {
  if (__a__t) {
    const state = JSON.parse(localStorage.getItem("__tkn__sts") ?? "{}");
    const newState = { ...state, __a__t };
    localStorage.setItem("__tkn__sts", JSON.stringify(newState));
  }
};

// Get refresh token from localstorage
const getRefreshToken = () => {
  const state = JSON.parse(localStorage.getItem("__tkn__sts") ?? "{}");
  return state["__r__t"];
};

// Set refresh token to localstorage
const setRefreshToken = (__r__t) => {
  if (__r__t) {
    const state = JSON.parse(localStorage.getItem("__tkn__sts") ?? "{}");
    const newState = { ...state, __r__t };
    localStorage.setItem("__tkn__sts", JSON.stringify(newState));
  }
};

// Remove access token and refresh token from localstorage
const removeTokens = () => {
  localStorage.removeItem("__tkn__sts");
};

// Set both access and refresh tokens with their expiry times
const setTokens = ({ accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry }) => {
  const newState = {
    __a__t: accessToken,
    __r__t: refreshToken,
    __a__t__exp: accessTokenExpiry,
    __r__t__exp: refreshTokenExpiry,
  };
  localStorage.setItem("__tkn__sts", JSON.stringify(newState));
};

// Check if the access token is expired
const isAccessTokenExpired = () => {
  const state = JSON.parse(localStorage.getItem("__tkn__sts") ?? "{}");
  const expiry = state["__a__t__exp"];
  return expiry ? Date.now() > expiry : true;
};

// Check if the refresh token is expired
const isRefreshTokenExpired = () => {
  const state = JSON.parse(localStorage.getItem("__tkn__sts") ?? "{}");
  const expiry = state["__r__t__exp"];
  return expiry ? Date.now() > expiry : true;
};

export {
  getAccessToken,
  getRefreshToken, isAccessTokenExpired,
  isRefreshTokenExpired, removeTokens, setAccessToken,
  setRefreshToken, setTokens
};

