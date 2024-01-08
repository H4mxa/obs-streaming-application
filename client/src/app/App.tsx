import { persistor, store } from "store";
import Navigation from "./route";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
        <Toaster position={"top-right"} />
      </PersistGate>
    </Provider>
  );
}

export default App;
