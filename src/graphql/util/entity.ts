import { User } from "../../database/user/user";
const POSTGRES_PARAM_LIMIT = 2000;

export const chunkEntitiesLookup = async (ids: string[]): Promise<User[]> => {
  let entityGroupIds;
  const entities: User[] = [];

  // don't modify the array passed to this function
  const _ids = [...ids];

  while ( _ids.length > 0) {
    try {
      entityGroupIds = _ids.splice(0, POSTGRES_PARAM_LIMIT);
      const entityGroup = await User.findByIds(entityGroupIds);
      entities.push(...entityGroup);
    } catch (error) {
      throw new Error(`getEntities: ${error}`);
    }
  }

  return entities;
};
