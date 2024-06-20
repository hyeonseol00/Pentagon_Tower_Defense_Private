import { baseUnderAttack } from './base.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import {
  killMonsterHandler,
  killTreasureGoblinHandler,
} from './monster.handler.js';
import {
  placeInitialTowerHandler,
  placeTowerHandler,
  refundTowerHandler,
  upgradeTowerHandler,
} from './tower.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  21: placeInitialTowerHandler,
  22: placeTowerHandler,
  23: killMonsterHandler,
  24: baseUnderAttack,
  25: refundTowerHandler,
  26: upgradeTowerHandler,
  27: killTreasureGoblinHandler,
};

export default handlerMappings;
