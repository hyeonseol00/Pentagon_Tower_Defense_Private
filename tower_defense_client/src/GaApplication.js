let authToken;
let userId;

function getAuthToken() {
  return authToken;
}

function setAuthToken(token) {
  authToken = token;
}

function getUserId() {
  return userId;
}

function setUserId(id) {
  userId = id;
}

export { getAuthToken, setAuthToken, getUserId, setUserId };
