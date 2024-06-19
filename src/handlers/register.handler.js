import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handleEvent } from './helper.js';
import {
  addUserData,
  getUserData,
  updateUserData,
} from '../models/user-data.model.js';
import { getGameAssets } from '../init/assets.js';
import jwt from 'jsonwebtoken';

const registerHandler = (io) => {
  io.on('connection', async (socket) => {
    const { commonData, monster } = getGameAssets();
    const userID = jwt.verify(
      socket.request.cookies.authorization.split(' ')[1],
      process.env.TOKEN_SECRET_KEY,
    ).id;
    const userData = await getUserData(userID);

    await addUser({ uuid: userID, socket_id: socket.id });
    if (!userData)
      await addUserData({
        account_id: userID,
        monster_level: monster.data[0].level,
        monster_spawn_interval: monster.data[0].spawn_interval,
        score: 0,
        user_high_score: 0,
        tower_coordinates: [],
        gold: commonData.data[0].user_gold,
        hp: commonData.data[0].base_hp,
      });
    else
      await updateUserData({
        account_id: userID,
        monster_level: monster.data[0].level,
        monster_spawn_interval: monster.data[0].spawn_interval,
        score: 0,
        tower_coordinates: [],
        gold: commonData.data[0].user_gold,
        hp: commonData.data[0].base_hp,
      });
    handleConnection(socket, userID);

    socket.on('event', (data) => handleEvent(io, socket, data));
    socket.on('disconnect', () => handleDisconnect(socket, userID));
  });
};

export default registerHandler;
