import { getGameAssets } from '../init/assets.js';

export const gameStart = async (uuid, payload) => {
  const { stages } = getGameAssets();

  return { status: 'success', message: '게임이 정상적으로 실행되었습니다.' };
};
