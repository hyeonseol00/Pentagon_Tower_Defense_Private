import { getUserData, updateUserData } from '../models/user-data.model.js';

export const baseUnderAttack = (userId, payload) => {
  const userData = getUserData(userId);

  if (userData.hp <= payload.hp)
    return { status: 'fail', message: '기지 체력 데이터가 잘못되었습니다!' };

  userData.hp = payload.hp;

  updateUserData(userData);

  return { status: 'success', message: '기지가 피격당했습니다!' };
};
