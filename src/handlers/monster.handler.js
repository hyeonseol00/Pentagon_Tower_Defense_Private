import { getGameAssets } from '../init/assets.js';
import { getUserData, updateUserData } from '../models/user-data.model.js';

async function monsterLevelUp(userData) {
  const { monster, commonData } = getGameAssets();

  userData.monster_level++;
  userData.monster_spawn_interval =
    monster[userData.monster_level - 1].spawn_interval;
  userData.gold += commonData.tower_cost;

  await updateUserData(userData);

  return {
    status: 'success',
    message: '몬스터를 처치했습니다, 몬스터가 강해집니다!',
    data: userData,
    monster: monster[userData.monster_level - 1],
  };
}

export const killMonsterHandler = async (userId, payload) => {
  const { monster } = getGameAssets();
  const userData = await getUserData(userId);

  if (Math.abs(userData.score - payload.score) >= 200)
    return { status: 'fail', message: '점수 데이터가 잘못되었습니다!' };

  userData.score += 100;

  if (
    userData.monster_level < monster.length &&
    userData.monster_level <= userData.score / 2000
  ) {
    return await monsterLevelUp(userData);
  }

  await updateUserData(userData);

  return {
    status: 'success',
    message: '몬스터를 처치했습니다!',
    data: userData,
  };
};

export const killTreasureGoblinHandler = async (userId, payload) => {
  const { monster, commonData } = getGameAssets();
  const userData = await getUserData(userId);
  let response;

  if (Math.abs(userData.score - payload.score) >= 200)
    return { status: 'fail', message: '점수 데이터가 잘못되었습니다!' };

  userData.score += 300;
  userData.gold += commonData.tower_cost * 2;

  if (
    userData.monster_level < monster.length &&
    userData.monster_level <= userData.score / 2000
  ) {
    response = await monsterLevelUp(userData);
  }

  if (response) {
    response.message =
      '보물 고블린을 처치했습니다! 특별 보상을 받으며 몬스터가 강해집니다!';
  } else {
    response = {
      status: 'success',
      message: '보물 고블린을 처치했습니다! 특별 보상을 받습니다.',
      data: userData,
    };
  }

  await updateUserData(userData);

  return response;
};
