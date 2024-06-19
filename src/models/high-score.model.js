const highScore = 0;

export const updateHighScore = (score) => {
  highScore = score;
};

export const getHighScore = () => {
  return highScore;
};
