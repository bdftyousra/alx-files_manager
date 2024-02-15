import redisClient from './redis';
import dbClient from './db';

/**
 * Module with user utilities
 */
const userUtils = {
  /**
   * Gets a user id and key of redis from request
   * @request {request_object} express request obj
   * @return {object} object containing userId and
   * redis key for token
   */
  async getUserIdAndKey(request) {
    const obj = { userId: null, key: null };

    const xToken = request.header('X-Token');

    if (!xToken) return obj;

    obj.key = `auth_${xToken}`;

    obj.userId = await redisClient.get(obj.key);

    return obj;
  },

  /**
   * Gets a user from database
   * @query {object} query expression for finding
   * user
   * @return {object} user document object
   */
  async getUser(query) {
    const user = await dbClient.usersCollection.findOne(query);
    return user;
  },
};

export default userUtils;
