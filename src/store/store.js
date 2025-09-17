import { createStore, rootReducer } from "@store/store-core.js";

import { coreMiddlewares } from "@store/middlewares/core.js";
import { classicMiddlewares } from "@store/middlewares/classic.js";
import { multipleChoiceMiddlewares } from "@store/middlewares/multiple-choice.js";
import { recordMiddlewares } from "@store/middlewares/record.js";
import { timeTrialMiddlewares } from "@store/middlewares/time-trial.js";


const store = createStore(rootReducer, [
  ...coreMiddlewares,
  ...classicMiddlewares,
  ...multipleChoiceMiddlewares,
  ...recordMiddlewares,
  ...timeTrialMiddlewares,
]);

export default store;

