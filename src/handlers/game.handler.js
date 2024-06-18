import { getGameAssets } from '../init/assets.js';

export const gameStart = (userId, payload) => {
  const { templates } = getGameAssets();

  return { status: 'success', message: '게임이 정상적으로 실행되었습니다.' };
};

export const gameEnd = (userId, payload) => {
  const { templates } = getGameAssets();

  return { status: 'success', message: '게임 종료!' };
};
