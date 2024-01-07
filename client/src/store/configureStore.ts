/**
 * Create the store with dynamic reducers
 */

import { configureStore, StoreEnhancer } from "@reduxjs/toolkit";
import { createInjectorsEnhancer } from "redux-injectors";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { createReducer } from "./reducers";
import { InjectedReducersType } from "utils/types/injector-typings";
import persistReducer from "redux-persist/es/persistReducer";
import { PersistConfig } from "redux-persist";

export const WHITE_LISTED_REDUCERS = [];

export const PERSIST_CONFIG: PersistConfig<any> = {
  key: "OS",
  storage,
  whitelist: WHITE_LISTED_REDUCERS,
};
export function configureAppStore(preloadedState: InjectedReducersType = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middleware = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const rootReducer = createReducer(preloadedState);
  const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => {
      return [
        ...getDefaultMiddleWare({
          serializableCheck: false,
        }),
        ...middleware,
      ] as any;
    },
    // TODO: Fix Redux-Persist issue before release, redux-persist requires devTools, here is the issue open in redux-persist lib https://github.com/rt2zz/redux-persist/issues/1287
    devTools: process.env.NODE_ENV !== "production",
    enhancers: (getDefaultEnhancers) => {
      return getDefaultEnhancers({
        autoBatch: { type: "tick" },
      }).concat(enhancers);
    },
  });
  return store;
}
