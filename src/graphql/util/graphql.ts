
export interface GraphQLContext {
  loginId: string;
  userId: string;
  permissions: [string];
}

export const DEFAULT_CACHE_2H = 1000 * 60 * 60 * 2;