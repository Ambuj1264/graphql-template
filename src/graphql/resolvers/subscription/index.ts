import { pubsub } from "../../schema";

export const subscriptionResolvers = { 
      operationFinished: {
        subscribe: () => pubsub.asyncIterator(["OPERATION_FINISHED"])
    }
};
