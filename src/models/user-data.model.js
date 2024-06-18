const userDatas = [];

export const addUserData = (userData) => {
  userDatas.push(userData);
};

export const updateUserData = (updatedUserData) => {
  const idx = userDatas.findIndex(
    (userData) => (userData.account_id = updatedUserData.account_id),
  );

  userDatas[idx] = updatedUserData;
};

export const getUserData = (userId) => {
  const userData = userDatas.find((userData) => (userData.account_id = userId));

  return userData;
};
