import { getGameAssets } from '../init/assets.js';
import { getHighScore, updateHighScore } from '../models/high-score.model.js';
import { getUserData, updateUserData } from '../models/user-data.model.js';

export const gameStart = (userId, payload) => {
  const { templates } = getGameAssets();

  return { status: 'success', message: '게임이 정상적으로 실행되었습니다.' };
};

export const gameEnd = (userId, payload) => {
  const userData = getUserData(userId);

  if (Math.abs(userData.score - payload.score) >= 200)
    return { status: 'fail', message: '점수 데이터가 잘못되었습니다!' };

  if (userData.user_high_score < payload.score)
    userData.user_high_score = payload.score;

  updateUserData(userData);

  if (getHighScore() < payload.score) {
    updateHighScore(payload.score);
    return {
      status: 'success',
      message: '게임 종료, 최고기록이 갱신되었습니다!',
      broadcast: {
        message: '서버 최고기록이 갱신되었습니다!',
        userId,
        highscore: getHighScore(),
      },
    };
  }

  return { status: 'success', message: '게임 종료!', data: userData };
};
