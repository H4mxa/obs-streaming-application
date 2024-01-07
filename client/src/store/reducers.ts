/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "@reduxjs/toolkit";

import { InjectedReducersType } from "utils/types/injector-typings";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state;
  } else {
    const newCombinedReducer = combineReducers({
      ...injectedReducers,
    });
    // const persistedReducer = persistReducer(PERSIST_CONFIG, newCombinedReducer);
    // persistor.persist();
    return newCombinedReducer;
  }
}

/**
 * @description In NODE_ENV=production environment the redux devtools is be disabled, due to this ReduxPersist library is not workable as expected,
 * so for that reason i have to manually persist the injected reducers by calling this hook in WHITE_LISTED reducers
 * issue is still open in redux=persist library
 * link: https://github.com/rt2zz/redux-persist/issues/1287 when issue get resolved then we don't need to do this step
 */
export function usePersist(_isReducerLoaded?: boolean) {
  // const initRef = useRef<ZeroOne>(0);
  // useEffect(() => {
  // if (initRef.current === 0) {
  // const storedState = persistor.getState();
  // ('redux-persist', { persistor, storedState });
  // persistor.persist();
  // initRef.current = 1;
  // }
  // }, []);
}
