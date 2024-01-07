import persistStore from "redux-persist/es/persistStore";
import { configureAppStore } from "./configureStore";

export const store = configureAppStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
