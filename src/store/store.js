import { createStore, rootReducer } from "@store/store-core.js";

import { coreMiddlewares } from "@store/middlewares/core.js";
import { challengeMiddlewares } from "@store/middlewares/challenge.js";
import { multipleChoiceMiddlewares } from "@store/middlewares/classic.js";
import { recordMiddlewares } from "@store/middlewares/record.js";
import { timeTrialMiddlewares } from "@store/middlewares/time-trial.js";


const store = createStore(rootReducer, [
  ...coreMiddlewares,
  ...challengeMiddlewares,
  ...multipleChoiceMiddlewares,
  ...recordMiddlewares,
  ...timeTrialMiddlewares,
]);

export default store;

